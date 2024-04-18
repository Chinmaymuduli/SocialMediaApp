import React, {createContext, ReactNode, useContext, useState} from 'react';

type Context_Type = {
  isLoggedIn: unknown;
  setIsLoggedIn: (isLoggedIn: unknown) => void;
  userData?: any;
  setUserData: (userData: any) => void;
};

const AppContext = createContext<Context_Type>({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  userData: null,
  setUserData: () => {},
});

type AppContextProviderProps = {
  children?: ReactNode;
};

export default ({children}: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<unknown>(null);
  const [userData, setUserData] = React.useState<unknown>(null);
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
