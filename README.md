This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
  adb -s emulator-5554 reverse tcp:8081 tcp:8081
  adb -s b85e914e reverse tcp:8081 tcp:8081

  ###### ALTERNATIVE METHOD AGORA

  agoraEngineRef.current = createAgoraRtcEngine();
  const agoraEngine = agoraEngineRef.current;

  useEffect(() => {
  const tokenCreateFn = async () => {
  console.log({channelName, uid});
  try {
  console.log({
  channel_name: String(channelName),
  uid: uid,
  role: 'publisher',
  expire_time: 3600,
  });
  const fetchData = await fetch(
  `${BASE_URL}/meetings/generate-agora-token`,
  {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${tokenData}`,
  },
  body: JSON.stringify({
  channel_name: String(channelName),
  uid: String(uid),
  role: 'publisher',
  expire_time: 3600,
  }),
  },
  );
  const agoraToken = await fetchData.json();
  console.log({agoraToken});
  return agoraToken.data?.token;
  } catch (error) {
  new Error();
  console.log(error);
  }
  };

  (async function init() {
  try {
  if (!isHost || !channelName || !uid) return;
  if (Platform.OS === 'android') await getPermission();
  const tokenRes = await tokenCreateFn();
  agoraEngine.initialize({
  appId: appId,
  });

        if (isHost === true) {
          console.log({tokenRes, channelName, uid});
          const joinUser = agoraEngine.joinChannel(
            tokenRes,
            String(channelName),
            Number(uid),
            {
              clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            },
          );
          console.log({joinUser});
        } else {
          agoraEngine.joinChannel(tokenRes, String(channelName), Number(uid), {
            clientRoleType: ClientRoleType.ClientRoleAudience,
          });
        }

        agoraEngine.registerEventHandler(agoraEventHandler);
      } catch (error) {
        console.log('error', error);
      }

  })();

  return () => {
  const agoraEngine = agoraEngineRef.current;
  if (agoraEngine) {
  agoraEngine.leaveChannel();
  agoraEngine.unregisterEventHandler(agoraEventHandler);
  agoraEngine.release();
  }
  };
  }, [uid, channelName, isHost, appId, tokenData]);
