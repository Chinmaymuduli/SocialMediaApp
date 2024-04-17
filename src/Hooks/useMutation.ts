import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {COLORS} from '~/styles';
import {BASE_URL} from '~/utils';

type MutationOptions = {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  isFormData?: boolean;
  BASE_URL?: string;
  body?: any;
  isAlert?: boolean;
};

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mutation = async (path: string, options?: MutationOptions) => {
    console.log(options, path);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const url = options?.BASE_URL || BASE_URL;
      setIsLoading(true);
      const method = options?.method || 'POST';
      const body = options?.body
        ? options?.isFormData
          ? options?.body
          : JSON.stringify(options.body)
        : `{}`;
      const headers: any = options?.isFormData
        ? {}
        : {'Content-Type': 'application/json'};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${url}/${path}`, {
        method,
        headers,
        body,
      });
      console.log({response});
      const status = response.status;
      const results = await response.json();
      if (options?.isAlert && status !== 200) {
        console.log(results?.error?.message);
        // Toast.show({
        //   title: 'Error',
        //   description: results?.error?.message,
        //   bgColor: COLORS.secondary,
        // });
      }
      if (options?.isAlert && status === 200) {
        console.log(results?.message);
        // Toast.show({
        //   title: 'Success',
        //   description: results?.message,
        //   bgColor: COLORS.primary,
        // });
      }
      setIsLoading(false);
      return {results, status};
    } catch (error) {
      setIsLoading(false);
    }
  };
  return {mutation, isLoading};
};

export default useMutation;
