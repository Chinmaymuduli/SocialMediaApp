import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PrivateContainer } from '~/Components/container';
import { COLORS } from '~/Styles';
import { Box } from '@gluestack-ui/themed';
import { colorsArray } from '~/Constants';
import { useNavigation } from '@react-navigation/native';
import { PrivateScreenProps } from '~/Routes/Private/types';
import useBasicFunction from '~/Hooks/useBasicFunctions';
import { useAppContext } from '~/Contexts';

const MoreOptions = () => {
  const { navigate } = useNavigation<PrivateScreenProps>();
  const { handleLogout, handleClearAccessToken } = useBasicFunction();
  const bgColor = (i: number) => colorsArray[i % colorsArray.length];
  const { userData } = useAppContext();

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



  const navigateToReportProblem = () => {
    console.log('Report a problem');
  };


  const Social_Interactions = () => {
    console.log('SocialInteractions');
    navigate('SocialInteractions');
  };
  const Relations = () => {
    navigate('RetentionAndChurnMetrics');
  };
  const Popular_Reel = () => {
    navigate('PopularReels');
  };
  const User_Feedback = () => {
    navigate('UserFeedback');
  };
  const User_Engagement = () => {
    navigate('UserEngagement');
  };
  const Revenue_Metrics = () => {
    navigate('RevenueMetrics');
  };
  const Technical_Metrics = () => {
    navigate('TechnicalMetrics');
  };
  const Demographic_Metrics = () => {
    navigate('DemographicMetrics');
  };
  const Acquisition_Metrics = () => {
    navigate('AcquisitionMetrics');
  };

  const logout = () => {
    handleLogout();
    handleClearAccessToken();
  };



  const supportItems = [
    { icon: 'report-problem', text: 'Help & Support', action: navigateToSupport },
    { icon: 'help-outline', text: 'Contact Us', action: navigateToContact },

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


  const postItems = [
    {
      icon: 'social-distance',
      text: 'Social Interactions',
      action: Social_Interactions,
    },
    {
      icon: 'diversity-3',
      text: 'Retention & Churn Metrics',
      action: Relations,
    },
    {
      icon: 'video-library',
      text: 'Popular Reels',
      action: Popular_Reel,
    },
    {
      icon: 'supervised-user-circle',
      text: 'User Engagement',
      action: User_Engagement,
    },
    // {
    //   icon: 'connect-without-contact',
    //   text: 'All Reviews',
    //   action: User_Feedback,
    // },
    {
      icon: 'monetization-on',
      text: 'Revenue Metrics',
      action: Revenue_Metrics,
    },
    // {
    //   icon: 'military-tech',
    //   text: 'Technical Metrics',
    //   action: Technical_Metrics,
    // },
    // {
    //   icon: 'add-moderator',
    //   text: 'Demographic Metrics',
    //   action: Demographic_Metrics,
    // },
    // {
    //   icon: 'family-restroom',
    //   text: 'Acquisition Metrics',
    //   action: Acquisition_Metrics,
    // },
  ];

  const actionsItems = [
    {
      icon: 'delete-outline',
      text: 'Delete Account',
      action: navigateToReportProblem,
    },
    { icon: 'logout', text: 'Log out', action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action }: any, index: any) => (
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
      <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>
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




          {/* Support and About settings */}

          <Box
            style={{ marginBottom: 12 }}
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
          {/*Post & Others  */}

          <Box
            style={{ marginBottom: 12 }}
            softShadow="1"
            bgColor="white"
            borderRadius={10}>
            <Text
              style={{
                marginVertical: 10,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 12,
              }}>
              Post & Others
            </Text>
            <View
              style={{
                borderRadius: 12,
                // backgroundColor: 'rgba(36, 39, 96, 0.05)',
              }}>
              {postItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item, index)}
                </React.Fragment>
              ))}
            </View>
          </Box>
          {/* Actions Settings */}

          <Box
            style={{ marginBottom: 12 }}
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

export default MoreOptions;


