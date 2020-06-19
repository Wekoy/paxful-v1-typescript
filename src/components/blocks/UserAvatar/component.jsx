import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const UserAvatar = ({ imageLink }) => {
  return (
    <div className="small-avatar">
      <img src={imageLink} alt="" />
    </div>
  );
};

UserAvatar.propTypes = {
  imageLink: PropTypes.string,
};

UserAvatar.defaultProps = {
  imageLink:
    'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
};

export default UserAvatar;
