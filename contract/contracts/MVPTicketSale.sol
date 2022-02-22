pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IMVPToken.sol";
import "./IMVPFlightTicket.sol";

contract MVPTicketSale is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address private _tokenContract;
    address private _ticketContract;

    enum FlightSaleStatus {
        NotReady,
        Open,
        Close
    }

    enum FlightClass {
        Economy,
        Bussiness,
        First
    }

    struct Flight {
        FlightSaleStatus saleStatus;
        string flightNumber;
        FlightClass class;
        uint16 availableSeats;
        string departureCode;
        uint256 departureTime;
        string arrivalCode;
        uint256 arrivalTime;
        uint256 price;
    }

    event AddedFlight(uint256 flightId);
    event PurchasedTicket(
        address indexed account,
        uint256 indexed flightId,
        uint256 ticketId
    );

    uint256 _nextTicketId = 0;

    Flight[] _flights;

    mapping(uint256 => uint256) _ticketIdToFlightId;
    mapping(address => uint256[]) _accountToTicketIds;

    constructor(
        address admin,
        address tokenContract,
        address ticketContract
    ) public {
        _setupRole(AccessControl.DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ADMIN_ROLE, admin);
        _tokenContract = tokenContract;
        _ticketContract = ticketContract;
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    modifier flightExisted(uint256 flightId) {
        require(flightId < _flights.length, "flight doesn't exist");
        _;
    }

    function numFlights() external view returns (uint256) {
        return _flights.length;
    }

    function flightById(uint256 flightId)
        external
        view
        flightExisted(flightId)
        returns (Flight memory)
    {
        return _flights[flightId];
    }

    function flightByTicketId(uint256 ticketId)
        external
        view
        returns (Flight memory)
    {
        IMVPFlightTicket ticketContract = IMVPFlightTicket(_ticketContract);
        require(
            ticketContract.ownerOf(ticketId) != address(0x0),
            "ticket doesn't exist"
        );

        return _flights[_ticketIdToFlightId[ticketId]];
    }

    function accountTicketIds(address account)
        external
        view
        returns (uint256[] memory)
    {
        return _accountToTicketIds[account];
    }

    function numAvailableSeats(uint256 flightId)
        external
        view
        flightExisted(flightId)
        returns (uint16)
    {
        Flight memory flight = _flights[flightId];
        if (flight.saleStatus != FlightSaleStatus.Open) {
            return 0;
        }

        return flight.availableSeats;
    }

    // Only for demo, not good for production
    function flights() external view returns (Flight[] memory) {
        Flight[] memory flights = new Flight[](_flights.length);

        for (uint256 i = 0; i < _flights.length; i++) {
            flights[i] = _flights[i];
        }

        return flights;
    }

    function withdrawTokens(address to, uint256 amount) public onlyAdmin {
        IMVPToken token = IMVPToken(_tokenContract);
        token.transfer(to, amount);
    }

    function addFlight(
        string memory flightNumber,
        FlightClass flightClass,
        uint16 numSeats,
        string memory departureCode,
        uint256 departureTime,
        string memory arrivalCode,
        uint256 arrivalTime,
        uint256 price
    ) external onlyAdmin {
        require(bytes(flightNumber).length > 0, "require flightNumber");
        require(bytes(departureCode).length > 0, "require departureCode");
        require(bytes(arrivalCode).length > 0, "require arrivalCode");
        require(
            departureTime < arrivalTime,
            "arrivalTime must be greater than departureTime"
        );

        uint256 flightId = _flights.length;
        _flights.push(
            Flight({
                saleStatus: FlightSaleStatus.Open,
                flightNumber: flightNumber,
                class: flightClass,
                availableSeats: numSeats,
                departureCode: departureCode,
                departureTime: departureTime,
                arrivalCode: arrivalCode,
                arrivalTime: arrivalTime,
                price: price
            })
        );

        emit AddedFlight(flightId);
    }

    function buyTicket(uint256 flightId) external flightExisted(flightId) {
        // validation
        Flight storage flight = _flights[flightId];
        require(
            flight.saleStatus == FlightSaleStatus.Open,
            "ticket is not open for sale"
        );
        require(flight.availableSeats > 0, "no available seats");

        // decrement available seats
        flight.availableSeats--;
        if (flight.availableSeats == 0) {
            flight.saleStatus = FlightSaleStatus.Close;
        }

        // payment
        IMVPToken token = IMVPToken(_tokenContract);
        token.transferFrom(msg.sender, address(this), flight.price);

        // issue ticket
        uint256 ticketId = _nextTicketId;
        IMVPFlightTicket ticketContract = IMVPFlightTicket(_ticketContract);
        ticketContract.mint(msg.sender, ticketId);

        // save to field
        _ticketIdToFlightId[ticketId] = flightId;
        _accountToTicketIds[msg.sender].push(ticketId);
        _nextTicketId++;

        emit PurchasedTicket(msg.sender, flightId, ticketId);
    }
}
