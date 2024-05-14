import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSwrApi} from '~/Hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '~/Utils';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

const GoogleAuth = () => {
  // const {data} = useSwrApi(`auth/google/select-profile`);
  const [data, setData] = useState(null);
  const [emailData, setEmailData] = useState<any>();
  const [accessToken, setAccessToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const {width} = useWindowDimensions();
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/google/select-profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // 'Content-Type': 'application/json',
          },
        });
        console.log({response});
        setEmailData(response?.url);
        const result = await response.json();

        console.log({result});
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log({data});
  return (
    <WebView
      source={{
        uri: emailData,
        // uri: `${BASE_URL}/auth/google/select-profile`,
      }}
      style={{flex: 1}}
    />
  );
};

export default GoogleAuth;

const styles = StyleSheet.create({});
