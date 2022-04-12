import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import Flights from '../components/organisms/Flights/Flights';
import FlightStats from '../components/organisms/FlightStats/FlightStats';
import InfoSection from '../components/organisms/InfoSection/InfoSection';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={'/'} element={<InfoSection />} />
        <Route path={'/flights'} element={<Flights />} />
        <Route path={'/stats'} element={<FlightStats />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
