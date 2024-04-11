import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PrivateContainer} from '~/Components/container';
import {COLORS} from '~/Styles';
import {Box} from '@gluestack-ui/themed';

const SettingScreen = () => {
  const navigateToEditProfile = () => {
    // navigation.navigate("EditProfile");
  };

  const navigateToSecurity = () => {
    console.log('Security function');
  };

  const navigateToNotifications = () => {
    console.log('Notifications function');
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

  const navigateToTermsAndPolicies = () => {
    console.log('Terms and Policies function');
  };

  const navigateToFreeSpace = () => {
    console.log('Free Space function');
  };

  const navigateToDateSaver = () => {
    console.log('Date saver');
  };

  const navigateToReportProblem = () => {
    console.log('Report a problem');
  };

  const addAccount = () => {
    console.log('Aadd account ');
  };

  const logout = () => {
    console.log('Logout');
  };

  const accountItems = [
    {
      icon: 'person-outline',
      text: 'Edit Profile',
      action: navigateToEditProfile,
    },
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
    {icon: 'lock-outline', text: 'Verify Aadhar', action: navigateToPrivacy},
  ];

  const supportItems = [
    {icon: 'help-outline', text: 'Help & Support', action: navigateToSupport},
    {icon: 'help-outline', text: 'Contact Us', action: navigateToSupport},

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
      icon: 'delete-outline',
      text: 'Request Connections',
      action: navigateToFreeSpace,
    },
    {icon: 'save-alt', text: 'My Connections', action: navigateToDateSaver},
    {icon: 'save-alt', text: 'My Meetings', action: navigateToDateSaver},
    {icon: 'save-alt', text: 'Reviews & Ratings', action: navigateToDateSaver},
  ];

  const actionsItems = [
    {
      icon: 'delete-outline',
      text: 'Delete Account',
      action: navigateToReportProblem,
    },
    {icon: 'logout', text: 'Log out', action: logout},
  ];

  const renderSettingsItem = ({icon, text, action}: any) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 12,
        gap: 7,
      }}>
      <MaterialIcons name={icon} size={24} color={COLORS.secondary} />
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
        {/* Account Settings */}
        <View style={{marginBottom: 12}}>
          <Text style={{marginVertical: 10, fontFamily: 'Montserrat-SemiBold'}}>
            Account
          </Text>
          <View
            style={{
              borderRadius: 12,
              //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
            }}>
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Connections & Details */}
        <View style={{marginBottom: 12}}>
          <Text style={{marginVertical: 10, fontFamily: 'Montserrat-SemiBold'}}>
            Connections & Details{' '}
          </Text>
          <View
            style={{
              borderRadius: 12,
              //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
            }}>
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <Box style={{marginBottom: 12}} softShadow="1" bgColor="white">
          <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
            Support & About{' '}
          </Text>
          <View
            style={{
              borderRadius: 12,
              //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
            }}>
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </Box>

        {/* Actions Settings */}

        <View style={{marginBottom: 12}}>
          <Text style={{marginVertical: 10, fontFamily: 'Montserrat-SemiBold'}}>
            Actions
          </Text>
          <View
            style={{
              borderRadius: 12,
              //   backgroundColor: 'rgba(36, 39, 96, 0.05)',
            }}>
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </PrivateContainer>
  );
};

export default SettingScreen;
