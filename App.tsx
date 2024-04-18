import React from 'react';
import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/Route';
import {AppContextProvider} from '~/Contexts';

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <AppContextProvider>
          <Route />
        </AppContextProvider>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
