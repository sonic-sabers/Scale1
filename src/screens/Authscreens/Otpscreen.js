import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,

  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Keyboard

} from 'react-native';
import { useNavigation,CommonActions } from '@react-navigation/native';
import { colors } from '../../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hstack, KeyboardavoidingWrapper } from '../../components';
import fetchService from '../../services/fetchService';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import fetchService from '../../services/fetchService';

import { useSelector, useDispatch } from 'react-redux';

// import * as localStorage from './';
import * as localStorage from '../../services/localStorage';
import * as authActions from '../../store/actions/auth';


import OTPTextInput from 'react-native-otp-textinput';

const Styledtextinput = (props) => {
  const [text, onChangeText] = React.useState("");
  // https://godconnect.online/api/UserMgmtAPI/ProfileCheck


  return (
    <View>
      <Text
        style={styles.customstyle}>
        {props.title}
      </Text>
      <View style={styles.inputstyle}>
        {!props.MaterialCommunityIcons ? <FontAwesome name={props.icon} size={20} color={colors.inputs} style={{
          marginBottom: -10
        }} /> :
          <MaterialCommunityIcons name={props.icon} size={25} color={colors.inputs} style={{
            marginBottom: -10
          }} />}
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            marginBottom: -10,
            marginLeft: 5,
            fontWeight: '400',

          }}>+91 -</Text>
        <TextInput
          style={{
            // marginLeft: 5,
            fontWeight: '400',
            fontSize: 25,
            color: '#caf0f8',
            marginBottom: -10,
            flex: 1,
          }}
          value={text}
          // secureTextEntry={hidePass ? true : false}

          placeholder={props.lable}
          placeholderTextColor={colors.white5}
          autoCapitalize="none"
          {...props}
        />
        {props.password &&
          <FontAwesome5
            name={hidePass ? 'eye-slash' : 'eye'}
            size={17}
            color="#caf0f8"
            onPress={() => setHidePass(!hidePass)}
          />}
      </View>
      <Hstack between>
        {props.error ? (
          <Text
            style={styles.errortext}>
            {props.error}
          </Text>
        ) : (
          <Text
            style={styles.errortext}></Text>
        )}
        {props.password &&
          <TouchableOpacity
            onPress={() => Alert.alert('Navigating to Forget password screen')}
          >
            <Text
              style={styles.forgettext}
            >
              Forget Password
            </Text>
          </TouchableOpacity>
        }
      </Hstack>
    </View>
  )
}

export default function Otpscreen({ route }) {
  const navigation = useNavigation();

  const [newmobile, setnewmobile] = useState(null)
  // const [otp, setotp] = useState(null)

  const { mobile, otherParam } = route?.params;

  useEffect(() => {
    setnewmobile(mobile);
    if (!mobile) {

      alert('error occured');
      navigation.navigate('Loginscreen');
    }
  }, [mobile])

  // console.log('4', newmobile);


  const [Error, setError] = useState('')
  const [Loading, setLoading] = React.useState("");
  const [hidePass, setHidePass] = React.useState(true);
  const FCMToken = 'Its an user token';

  const [mobileNo, setMobileNo] = useState('');
  const [fetchingData, setFetchingData] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const customerType = useSelector(state => state.auth.customerType);
  const customerId = useSelector(state => state.auth.customerId);
  const mobileno = useSelector(state => state.auth.mobileNo);
  const [screenotp, setscreenotp] = useState('');



  const UserInfo = {
    mobile: '',
    otp: '',
  };

  const [number, setNumber] = React.useState();
  const [customer_mobile_otp, setcustomer_mobile_otp] = useState('');

  const dispatch = useDispatch();


  const regex = /^(?:\d{6}|\w+@\w+\.\w{2,3})$/
  const validationSchema = Yup.object({
    otp:
      Yup.string()
        .trim()
        .matches(regex, 'This field must be Phone number')
        .min(4, 'Minimum 4 characters is required')
        .required('Required!'),
  });

  const sendLogin = async (values) => {
    // console.log('props', p5453rops.route.params.customerId);

    if (!values.otp || values.otp === '') {
      Alert.alert('Error', 'Please Enter OTP', [{ text: 'Okay' }]);
      return;
    }

    setFetchingData(true);

    const response = await fetchService.login(
      mobile,
      values.otp,
    );
    setFetchingData(false);
    console.log('res',response);
    if (response.status) {
      let userData =  response.data ;
      // console.log('user1', ...response.currentStatus);
      
      await localStorage.set('userData', JSON.stringify(userData));
      // dispatch(authActions.updateUserData(userData));

      // console.log('user', userData);
      // navigation.navigate('Bottomtab')
      
      // setcustomer_mobile_otp('');

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Bottomtab' }
          ],
        })
      );
      
      // props.navigation.navigate('Tabs');

    } else {
      setError(response.msg);
    }
  };


  const sendUserOtp = async () => {
    if (!mobile || mobile.trim() === '') {
      Alert.alert('Error', 'Please Enter Mobile No', [{ text: 'Okay' }]);
      return;
    }
    try {
      console.log('1', mobile)
      setFetchingData(true);
      const response = await fetchService.sentUserOtp(mobile);
      setFetchingData(false);
      if(response){
      alert('OTP Sent')}
   
    } catch (error) {
      setFetchingData(false);
    }

  };



  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            flex: 1,
            paddingRight: 20,
          }}>
          <View style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Loginscreen', {
                    status: 'back',
                  })}
                style={styles.backbutton}>
                <Octicons name='arrow-left'
                  size={27} color={colors.primary} />
              </TouchableOpacity>
              <Text
                style={styles.hitext}
              >
                OTP Screen
              </Text>

              <Text
                style={styles.logintext}
              >
                Input OTP Here
              </Text>
            </View>
            <View>
              <Formik
                initialValues={UserInfo}
                onSubmit={(values, formikActions) => {
                  sendLogin(values);
                  setTimeout(() => {
                    formikActions.resetForm();
                    formikActions.setSubmitting(false);
                  }, 5000);
                }}
                validationSchema={validationSchema}>
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => {
                  {
                  }
                  const { otp } = values;
                  return (
                    <>

                      <OTPTextInput
                        tintColor="#0153b7"
                        textInputStyle={{
                          color: '#000000',
                          // backgroundColor: 'green',
                          borderRadius: 5,
                          borderWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: '#E4DFDF',
                          backgroundColor: colors.white,
                        }}
                        inputCount={6}
                        offTintColor='#E4DFDF'
                        // handleTextChange={screenotp => {
                        //   setscreenotp(screenotp);
                        // }}
                        MaterialCommunityIcons
                        error={touched.otp && errors.otp}
                        handleTextChange={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        selectionColor={colors.white}
                      />
                      <TouchableOpacity
                        submitting={isSubmitting}
                        onPress={handleSubmit}
                        style={{
                          backgroundColor: '#FFFFFF',
                          padding: 15,
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // marginVertical: 20,
                          marginTop: 20,
                          height: 60,
                        }}>
                        {Loading ?
                          <ActivityIndicator />
                          : <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '700',
                              fontFamily: 'Roboto',
                              color: colors.primary
                            }}>
                            Login with OTP
                          </Text>}
                      </TouchableOpacity>
                    </>
                  );
                }}
              </Formik>
              <TouchableOpacity
                onPress={() => {
                  sendUserOtp()
                }}


              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    fontFamily: 'Roboto',
                    color: colors.white,
                    margin:10,
                    alignSelf:'flex-end'
                  }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
              <Hstack centered styles={{ marginVertical: 15, }}>
                <View
                  style={styles.hline} />
                <Text
                  style={styles.ortext}>
                  or
                </Text>
                <View
                  style={styles.hline} />
              </Hstack>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Loginscreen')
                }}
                style={styles.registerbutton}>
                <Text
                  style={styles.registertext}>
                  Loginscreen
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  backbutton: {
    backgroundColor: colors.white,
    height: 36,
    width: 36,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitext: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: colors.white,
    marginTop: 5,
  },
  logintext: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: colors.white,
    marginTop: -5,
    marginBottom: 15
  },
  hline: {
    height: 2,
    flex: 1,
    backgroundColor: colors.white3,
    borderRadius: 40
  },
  registerbutton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 20,
    height: 60,
    borderWidth: 1.5,
    borderColor: colors.white
  },
  registertext: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: colors.white
  },
  ortext: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: colors.white3,
    marginHorizontal: 10,
    marginTop: -5,
  },
  forgettext: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: colors.white,
    marginTop: 5,
  },
  inputstyle: {
    flexDirection: 'row',
    width: '100%',
    // height: 40,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: colors.inputs,
    alignItems: 'center',
    marginTop: -10,
  },
  customstyle: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: '#edf2f4',
    marginTop: 10,
  },
  errortext: {
    color: 'red',
    fontSize: 13.5,
    marginBottom: -10,
    marginLeft: 11,
  }
})