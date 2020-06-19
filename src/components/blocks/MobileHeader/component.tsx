import React, { useState } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from 'constants/index';
import DialogsList from '../DialogsList';
import DialogDetails from '../DialogDetails';

import './style.css';

type Anchor = 'left' | 'right';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: drawerWidth,
  },
}));

const MobileHeader: React.FC = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState({ left: false, right: false });

  const handleDrawerToggle = (anchor: Anchor, isDrawerOpen: boolean) => {
    setIsOpen({ ...isOpen, [anchor]: isDrawerOpen });
  };

  return (
    <div id="trade-mobile-header" className="mobile-header">
      <IconButton onClick={() => handleDrawerToggle('left', true)} className="">
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen.left}
        onClick={() => handleDrawerToggle('left', false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <DialogsList />
      </Drawer>
      <IconButton
        onClick={() => handleDrawerToggle('right', true)}
        className=""
      >
        <InfoIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen.right}
        onClick={() => handleDrawerToggle('right', false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className="trades-dialogs__details mobile">
          <DialogDetails />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileHeader;
