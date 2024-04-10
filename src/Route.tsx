import React, {useState} from 'react';
import PrivateRoutes from './Routes/Private';
import PublicRoutes from './Routes/Public';

const Route = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Route;
