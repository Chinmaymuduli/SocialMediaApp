import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '~/Contexts';
import {BASE_URL} from '~/Utils';

const useBasicFunction = () => {
  const {setIsLoggedIn, setUserData} = useAppContext();
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
        setUserData({});
        setIsLoggedIn(false);
      })
      .catch(error => console.log(error));
  };

  const getUser = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken, 'accessToken in get User');
    if (!accessToken) {
      setUserData({user: {}, isUserLoading: false});
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      const status = res?.status;

      console.log({status});

      if (status === 401) {
        await AsyncStorage.removeItem('accessToken');
        setUserData({});
      }
      if (status === 500) {
        setUserData({});
      }
      if (status === 200) {
        setUserData(data?.data);
      }
      return {data, status};
    } catch (error) {
      setUserData({});
    }
  };

  return {
    handleSetAccessToken,
    handleClearAccessToken,
    handleLogin,
    handleLogout,
    getUser,
  };
};

export default useBasicFunction;
