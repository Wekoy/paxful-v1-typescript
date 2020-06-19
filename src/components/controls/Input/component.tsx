import React, { FC } from 'react';

import './style.css';

type Props = {
  name: string,
  value: string,
  type: string,
  placeholder: string,
  onInputChange: any,
};

const Input: FC<Props> = ({
  name,
  value,
  type,
  placeholder,
  onInputChange,
}) => {
  return (
    <div className="input-wrap">
      <input
        className="simple-input"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onInputChange}
      />
    </div>
  );
};

export default Input;
