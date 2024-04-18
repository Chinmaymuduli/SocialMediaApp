import React, {useState} from 'react';
import PrivateRoutes from './Routes/Private';
import PublicRoutes from './Routes/Public';
import {useAppContext} from './Contexts';

const Route = () => {
  const {isLoggedIn} = useAppContext();
  return isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Route;
