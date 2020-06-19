import React from 'react';
import ButtonUi from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { changeAccount } from 'actions/accountAction';

const ChangeUserButton = () => {
  const dispatch = useDispatch();

  const changeAccountHandler = () => {
    dispatch(changeAccount());
  };

  return (
    <ButtonUi
      variant="contained"
      color="secondary"
      onClick={changeAccountHandler}
    >
      Change user account
    </ButtonUi>
  );
};

export default ChangeUserButton;
