import React, { FC } from 'react';
import DialogBoxHeader from '../DialogBoxHeader';
import DialogBoxBody from '../DialogBoxBody';

import './style.css';

const DialogBox: FC = () => {
  return (
    <>
      <DialogBoxHeader />
      <DialogBoxBody />
    </>
  );
};

export default DialogBox;
