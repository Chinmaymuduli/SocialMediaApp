import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PrivateContainer} from '~/Components/container';
import {COLORS} from '~/Styles';
import {Box} from '@gluestack-ui/themed';
import {colorsArray} from '~/Constants';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import useBasicFunction from '~/Hooks/useBasicFunctions';

const SettingScreen = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {handleLogout, handleClearAccessToken} = useBasicFunction();
  const bgColor = (i: number) => colorsArray[i % colorsArray.length];
  const navigateToEditProfile = () => {
    // navigation.navigate("EditProfile");
  };

  const navigateToSecurity = () => {
    console.log('Security function');
  };

  const navigateToNotifications = () => {
    console.log('Notifications function');
    navigate('Notifications');
  };

  const navigateToPrivacy = () => {
    console.log('Privacy function');
  };

  const navigateToSubscription = () => {
    console.log('Subscription function');
  };

  const navigateToSupport = () => {
    console.log('Support function');
  };
  const navigateToContact = () => {
    console.log('Support function');
    navigate('ContactUs');
  };

  const navigateToTermsAndPolicies = () => {
    console.log('Terms and Policies function');
  };

  const navigateToFreeSpace = () => {
    console.log('Free Space function');
  };

  const navigateToDateSaver = () => {
    console.log('Date saver');
  };
  const navigateToMeetings = () => {
    console.log('Date saver');
    navigate('Meetings');
  };
  const navigateToMyConnections = () => {
    console.log('Date saver');
    navigate('MyConnections');
  };
  const navigateToRequest = () => {
    console.log('Date saver');
    navigate('RequestConnections');
  };
  const navigateToAadhar = () => {
    console.log('Date saver');
    navigate('VerifyAadhar');
  };

  const navigateToReportProblem = () => {
    console.log('Report a problem');
  };

  const addAccount = () => {
    console.log('Aadd account ');
  };

  const logout = () => {
    handleLogout();
    handleClearAccessToken();
  };

  const accountItems = [
    // {
    //   icon: 'person-outline',
    //   text: 'Edit Profile',
    //   action: navigateToEditProfile,
    // }
    // {icon: 'lock-outline', text: 'Verify Aadhar', action: navigateToAadhar},

    {
      icon: 'security',
      text: 'Two Step Verification',
      action: navigateToSecurity,
    },
    {
      icon: 'notifications-none',
      text: 'Notifications',
      action: navigateToNotifications,
    },
  ];

  const supportItems = [
    {icon: 'report-problem', text: 'Help & Support', action: navigateToSupport},
    {icon: 'help-outline', text: 'Contact Us', action: navigateToContact},

    {
      icon: 'credit-card',
      text: 'Privacy Policies',
      action: navigateToSubscription,
    },
    {
      icon: 'info-outline',
      text: 'Terms and Policies',
      action: navigateToTermsAndPolicies,
    },
  ];

  const cacheAndCellularItems = [
    {
      icon: 'bookmark-add',
      text: 'Request Connections',
      action: navigateToRequest,
    },
    {
      icon: 'diversity-1',
      text: 'My Connections',
      action: navigateToMyConnections,
    },
    {icon: 'event-note', text: 'My Meetings', action: navigateToMeetings},
    {
      icon: 'rate-review',
      text: 'Reviews & Ratings',
      action: navigateToDateSaver,
    },
  ];

  const actionsItems = [
    {
      icon: 'delete-outline',
      text: 'Delete Account',
      action: navigateToReportProblem,
    },
    {icon: 'logout', text: 'Log out', action: logout},
  ];

  const renderSettingsItem = ({icon, text, action}: any, index: any) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 12,
        gap: 7,
      }}>
      {/* <MaterialIcons name={icon} size={24} color={COLORS.secondary} /> */}
      <Box
        bg={bgColor(index)}
        borderRadius={7}
        justifyContent={'center'}
        alignItems={'center'}
        w={'$6'}
        h={'$6'}>
        <Box p={'$1'}>
          <MaterialIcons name={icon} size={15} color={'white'} />
        </Box>
      </Box>
      <Text style={{fontSize: 13, fontFamily: 'Montserrat-SemiBold'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <PrivateContainer hasBackIcon={true} title={'More Options'}>
      <ScrollView
        // style={{marginHorizontal: 12}}
        showsVerticalScrollIndicator={false}>
        <Box px={'$3'} mt={'$2'}>
          {/* Account Settings */}
          <Box
            softShadow="1"
            bgColor="white"
            style={{marginBottom: 12}}
            borderRadius={10}>
            <Text
              style={{
                marginVertical: 10,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 12,
              }}>
              Account
            </Text>
            <View
              style={{
                borderRadius: 12,
                //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
              }}>
              {accountItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item, index)}
                </React.Fragment>
              ))}
            </View>
          </Box>

          {/* Connections & Details */}
          <Box
            softShadow="1"
            bgColor="white"
            style={{marginBottom: 12}}
            borderRadius={10}>
            <Text
              style={{
                marginVertical: 10,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 12,
              }}>
              Connections & Details{' '}
            </Text>
            <View
              style={{
                borderRadius: 12,
                //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
              }}>
              {cacheAndCellularItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item, index)}
                </React.Fragment>
              ))}
            </View>
          </Box>

          {/* Support and About settings */}

          <Box
            style={{marginBottom: 12}}
            softShadow="1"
            bgColor="white"
            borderRadius={10}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 12,
                marginVertical: 10,
              }}>
              Support & About{' '}
            </Text>
            <View
              style={{
                borderRadius: 12,
                //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
              }}>
              {supportItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item, index)}
                </React.Fragment>
              ))}
            </View>
          </Box>

          {/* Actions Settings */}

          <Box
            style={{marginBottom: 12}}
            softShadow="1"
            bgColor="white"
            borderRadius={10}>
            <Text
              style={{
                marginVertical: 10,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 12,
              }}>
              Actions
            </Text>
            <View
              style={{
                borderRadius: 12,
                //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
              }}>
              {actionsItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item, index)}
                </React.Fragment>
              ))}
            </View>
          </Box>
        </Box>
      </ScrollView>
    </PrivateContainer>
  );
};

export default SettingScreen;
