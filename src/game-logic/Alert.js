import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';

const Alert = () => {
  const { alert, showAlert } = useGlobalContext();
  const { show, msg, type } = alert;
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert({});
    }, 2000);
    return () => clearTimeout(timeout);
  }, [showAlert]);
  return <p className={`gameover__alert gameover__alert--${type}`}>{msg}</p>;
};

export default Alert;
