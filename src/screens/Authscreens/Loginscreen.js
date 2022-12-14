import React,
{
  useState,
} from 'react';
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
import { useNavigation } from '@react-navigation/native';
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



const Styledtextinput = (props) => {
  const [text, onChangeText] = React.useState("");
  // https://godconnect.online/api/UserMgmtAPI/ProfileCheck
  const [hidePass, setHidePass] = React.useState(true);
  const navigation = useNavigation();

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


export default function Loginscreen() {
  const [Error, setError] = useState('')
  const navigation = useNavigation();
  const [Loading, setLoading] = React.useState("");
  const [hidePass, setHidePass] = React.useState(true);
  const FCMToken = 'Its an user token';

  const [mobileNo, setMobileNo] = useState('');
  const [fetchingData, setFetchingData] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const customerType = useSelector(state => state.auth.customerType);
  const customerId = useSelector(state => state.auth.customerId);
  const mobileno = useSelector(state => state.auth.mobileNo);

  const UserInfo = {
    mobile: '',
  };

  const regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/
  const validationSchema = Yup.object({
    mobile:
      Yup.string()
        .trim()
        .matches(regex, 'This field must be Phone number')
        .min(10, 'Minimum 10 characters is required')
        .required('Required!'),


    // PWord: Yup.string()
    //   .trim(),
    // .min(8, 'Password is too short!')
    // .required('Password is required!'),
  });
  const handlesLogin = async (values) => {
    console.log('1', values)

    // navigation.replace('Bottomtab', {
    //   mobile: values.mobile,
    // });   
    // setLoading(true);
    // const response = await fetchService.login(values.mobile, values.PWord, FCMToken);
    // setLoading(false);
    // if (response.status) {
    // navigation.replace('Bottomtab', {
    //   mobile: values.mobile,
    // });
    // } else {
    //   setError(response.message);
    //   Alert.alert(response.msg)
    // }
  };

  const sendUserOtp = async (values) => {
    if (!values.mobile || values.mobile.trim() === '') {
      Alert.alert('Error', 'Please Enter Mobile No', [{ text: 'Okay' }]);
      return;
    }
    try {
      // console.log('1', values)
      setFetchingData(true);
      const response = await fetchService.sentUserOtp(values.mobile);
      setFetchingData(false);
      // console.log('3', response)
      if(!response.status){
      alert(response.msg)}
      if (response.status) {
        navigation.navigate('Otpscreen', {
          mobile: values.mobile,
        });
        setOtpPage(true);
      } else {
        setError(response.msg);
      }
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
                  navigation.navigate('Onboardingscreen', {
                    status: 'back',
                  })}
                style={styles.backbutton}>
                <Octicons name='arrow-left'
                  size={27} color={colors.primary} />
              </TouchableOpacity>
              <Text
                style={styles.hitext}
              >
                Hi There!
              </Text>

              <Text
                style={styles.logintext}
              >
                Log In Here
              </Text>
            </View>
            <View>
              <Formik
                initialValues={UserInfo}
                onSubmit={(values, formikActions) => {
                  sendUserOtp(values);
                  setTimeout(() => {
                    formikActions.resetForm();
                    formikActions.setSubmitting(false);
                  }, 4000);
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
                  const { mobile } = values;
                  return (
                    <>

                      <Styledtextinput
                        // onChangeText={setmobile}
                        placeholderTextColor={colors.white5}
                        title='Enter your Phone Number'
                        placeholder='9879879871'
                        value={mobile}
                        autoCapitalize="none"
                        icon='phone'
                        maxLength={10}
                        keyboardType='numeric'
                        MaterialCommunityIcons
                        error={touched.mobile && errors.mobile}
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')}
                        selectionColor={colors.white}

                      />
                      {/* <Styledtextinput
                        value={PWord}
                        placeholder='Password'
                        placeholderTextColor={colors.inputs}
                        autoCapitalize="none"
                        title='Enter your Password'
                        icon='lock'
                        keyboardType='password'
                        error={touched.PWord && errors.PWord}
                        onChangeText={handleChange('PWord')}
                        onBlur={handleBlur('PWord')}
                        password
                        selectionColor={colors.white}
                      /> */}

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
                            Send OTP
                          </Text>}
                      </TouchableOpacity>
                    </>
                  );
                }}
              </Formik>
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
                  navigation.navigate('Signupscreen')
                }}
                style={styles.registerbutton}>
                <Text
                  style={styles.registertext}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // </KeyboardavoidingWrapper>
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