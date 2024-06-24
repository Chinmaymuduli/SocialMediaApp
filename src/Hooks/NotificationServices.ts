import notifee, {
  AndroidBadgeIconType,
  AndroidColor,
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';

class NotificationService {
  static displayLocalNotification = async (
    title: any,
    body: any,
    data: any,
  ) => {
    console.log({title, body, data});
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      // for android
      // color: AndroidColor.RED,
      id: 'general',
      name: 'General',
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: title,
      body: body,
      data: data,
      android: {
        channelId,
        //   largeIcon: applogo here,
        style: {type: AndroidStyle.BIGTEXT, text: body},
      },
    });
  };
}

export default NotificationService;
