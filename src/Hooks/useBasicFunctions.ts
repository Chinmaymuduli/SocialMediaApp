import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '~/Contexts';

const useBasicFunction = () => {
  const {setIsLoggedIn} = useAppContext();
  // set accessToken to async storage
  const handleSetAccessToken = (accessToken: string) => {
    if (accessToken) {
      AsyncStorage.setItem('accessToken', accessToken)
        .then(() => {
          console.log('access token set successfully');
        })
        .catch(error => console.log(error));
    }
  };
  const handleClearAccessToken = () => {
    AsyncStorage.removeItem('accessToken')
      .then(() => {
        console.log('access token cleared successfully');
      })
      .catch(error => console.log(error));
  };
  const handleLogin = () => {
    AsyncStorage.setItem('isLoggedIn', 'true')
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(error => console.log(error));
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('isLoggedIn')
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch(error => console.log(error));
  };

  return {
    handleSetAccessToken,
    handleClearAccessToken,
    handleLogin,
    handleLogout,
  };
};

export default useBasicFunction;
