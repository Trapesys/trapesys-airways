import { Box, makeStyles, TextField, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { FC } from 'react';
import { ReactComponent as Calendar } from '../../../shared/assets/icons/calendar_month_black_24dp.svg';
import theme from '../../../theme/theme';
import { ETripType } from '../TripTypeSelector/tripTypeSelector.types';
import { ITripDateRangeProps } from './tripDateRange.types';

const TripDateRange: FC<ITripDateRangeProps> = (props) => {
  const { departDate, returnDate, tripType, setDepartDate, setReturnDate } =
    props;

  const classes = useStyles();

  const returnPickerID = 'return-picker';

  const CustomTextField = ({
                             onChange,
                             placeholder,
                             value,
                             id,
                             onClick
                           }: any) => (
    <TextField
      id={id}
      disabled={tripType === ETripType.ONE_WAY && id === returnPickerID}
      color={'secondary'}
      placeholder={placeholder}
      variant={'outlined'}
      onChange={onChange}
      value={value}
      onClick={onClick}
      className={classes.inputField}
      InputProps={{
        endAdornment: (
          <Calendar
            style={{
              fill: theme.palette.custom.navyBlue
            }}
          />
        )
      }}
    />
  );

  return (
    <Box className={classes.selectorWrapper}>
      <Box className={classes.singleSelectorWrapper}>
        <Typography className={classes.label}>Departure</Typography>
        <Box mt={2}>
          <DatePicker
            autoOk
            value={departDate}
            disablePast={true}
            onChange={(date) => setDepartDate(moment(date).toDate())}
            placeholder={'DD.MM.YYYY.'}
            inputVariant={'outlined'}
            DialogProps={{
              PaperProps: {
                classes: {
                  root: classes.rootClass
                }
              }
            }}
            TextFieldComponent={CustomTextField}
            format={'DD.MM.YYYY.'}
            style={{
              borderRadius: '10px'
            }}
          />
        </Box>
      </Box>
      <Box className={classes.singleSelectorWrapper} ml={2}>
        <Typography className={classes.label}>Return</Typography>
        <Box mt={2}>
          <DatePicker
            autoOk
            value={returnDate}
            disablePast={true}
            onChange={(date) => setReturnDate(moment(date).toDate())}
            placeholder={'DD.MM.YYYY.'}
            inputVariant={'outlined'}
            DialogProps={{
              PaperProps: {
                classes: {
                  root: classes.rootClass
                }
              }
            }}
            id={returnPickerID}
            TextFieldComponent={CustomTextField}
            format={'DD.MM.YYYY.'}
            style={{
              borderRadius: '10px'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    selectorWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    singleSelectorWrapper: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      color: theme.palette.custom.navyBlue,
      fontWeight: 500
    },
    inputField: {
      width: '200px'
    },
    rootClass: {
      fontFamily: 'Poppins'
    }
  };
});

export default TripDateRange;
