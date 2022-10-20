// const Contactus = ()=> {
//   return (
//   <View>
//     <Text>Contactus</Text>
//   </View>

//   )
// }

//   <Text
//     style={{
//       fontSize: 12,
//       fontWeight: '500',
//       fontFamily: 'Roboto',
//       color: colors.white,
//     }}>
//     ScaleRich1
//   </Text>

//   <AntDesign name='star' size={20} color={colors.primary} />

// </> */}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Homescreen, Onboardingscreen, Loginscreen, Signupscreen, Otpscreen } from './src/screens';
import Bottomtab from './src/screens/Appscreens/Bottomtab';
import { Provider as PaperProvider } from 'react-native-paper';
import { View, Text, Image, StatusBar, Dimensions } from 'react-native';
import { colors } from './src/constants';
import store from './src/store';
import { Provider } from 'react-redux';
import * as localStorage from './src/services/localStorage';
// import * as localStorage from '../src/services/localStorage';
import * as authActions from './src/store/actions/auth';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';


const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

let dimensions = Dimensions.get('window');
// let imageHeight = Math.round((dimensions.width * 431) / 360);
let imageWidth = dimensions.width;
let imageHeight = dimensions.height;
let itemwidth = imageWidth / 2 - 20


const delay = 2.5;

export default function App() {
  const [show, setShow] = React.useState(false);
  const [dataRestored, setDataRestored] = React.useState(false);

  React.useEffect(
    () => {
      let timer1 = setTimeout(() => setShow(true), delay * 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    [],
  );



  React.useEffect(() => {
    // let componentUnmounted = false;

    const restoringSession = async () => {
      let userData = await localStorage.get('userData');
      if (userData) {
        // console.log(userData)
        setDataRestored(true);
      }
    };

    restoringSession();

    return () => {
    };
  }, []);
  return (
    <PaperProvider >
      <Provider store={store}>
        <StatusBar
          animated={true}
          backgroundColor={colors.primary}
        />
        {!show ? (
          <View>
            <Image
              source={require('./src/assets/Animation.gif')}
              style={{
                width: imageWidth / 1, height: imageHeight / 1,
                zIndex: 300,
              }} />
          </View>
        ) : (
          <>
            {!dataRestored ?
              <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptionStyle}>
                  <Stack.Screen name="Onboardingscreen" component={Onboardingscreen} />
                  <Stack.Screen name="Loginscreen" component={Loginscreen} />
                  <Stack.Screen name="Bottomtab" component={Bottomtab} />
                  <Stack.Screen name="Signupscreen" component={Signupscreen} />
                  <Stack.Screen name="Otpscreen" component={Otpscreen} />
                </Stack.Navigator>
              </NavigationContainer>
              :
              <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptionStyle}>
                  <Stack.Screen name="Bottomtab" component={Bottomtab} />
                </Stack.Navigator>
              </NavigationContainer>}
          </>
        )}
      </Provider>
    </PaperProvider>
  );
}