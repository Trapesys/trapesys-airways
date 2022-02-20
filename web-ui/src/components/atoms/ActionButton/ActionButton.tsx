import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FC } from 'react';
import { IActionButtonProps } from './actionButton.types';

const ActionButton: FC<IActionButtonProps> = (props) => {
  const {
    text,
    onClick,
    startIcon,
    endIcon,
    disabled = false,
    square = false
  } = props;

  const classes = useStyles();

  return (
    <Button
      variant={'contained'}
      onClick={onClick}
      className={clsx('actionButtonBase', {
        [classes.actionButtonSquare]: square
      })}
      color={'secondary'}
      startIcon={startIcon}
      disabled={disabled}
      endIcon={endIcon}
    >
      {text}
    </Button>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    actionButtonSquare: {
      borderRadius: '10px !important'
    }
  };
});

export default ActionButton;
