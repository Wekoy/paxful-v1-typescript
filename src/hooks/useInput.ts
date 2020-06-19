import React from 'react';
import { useState } from 'react';

const useInput = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = () => setValues(initialValue);

  return [values, handleFieldChange, reset];
};

export default useInput;
