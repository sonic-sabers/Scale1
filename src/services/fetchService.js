import apiService from './apiService';
import errorService from './errorService';
import queryService from './queryService';
import * as localStorage from './localStorage';
var RNFS = require('react-native-fs');
import { Alert, Platform } from 'react-native';

var fetchService = {
  sentUserOtp: async function (mobile) {
    let API = apiService.Login;
    try {
      let params = {
        mobile: mobile,
      };
      // console.log('2', params, API);
      let queryParams = queryService.preareQueryParams(params);

      const response = await fetch(API, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        // body: queryParams,
        body: JSON.stringify({
          mobile: mobile,
        })
      });

      const resData = await response.json();
      console.log('response', resData);
      // if (!resData.message) {
      //   alert('Login failed');
      // }
      if (!resData.message) {
        const message = resData.msg;
        const errorRes = {
          status: false,
          // data: message,
          // code: resData.success,
          // msg: message,
          msg: 'Error orccured',

        };
        const sessionResp = errorService.checkSession(errorRes);
        return sessionResp;
      }
      return { status: true, data: resData.message };
    } catch (e) {
      var res = errorService.checkErrors(e);

      if (
        res &&
        typeof res === 'object' &&
        res.constructor === Object &&
        res.hasOwnProperty('status')
      ) {
        return res;
      }
      throw e;
      // return { status: false, msg: "Something Went wrong" };
    }
  },
  login: async function (
    mobile,
    otp,
  ) {
    let API = apiService.verifyotp;


    try {
      let params = {
        mobile: mobile,
        otp: otp,
      };
      //  console.log('params', params, API);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({   mobile: mobile,
          otp: otp, })
    };

      const response = await fetch(API, requestOptions);

      const resData = await response.json();
      // console.log('response', resData);
      
      
      
      // console.log('11', resData);

      if (!resData.id) {
        alert(resData.msg);
      }
      if (!resData.jwt) {
        const message = resData.msg;
        const errorRes = {
          status: false,
          data: message,
          code: resData.success,
          msg: message,
        };
        const sessionResp = errorService.checkSession(errorRes);
        return sessionResp;
      }
      return { status: true, data: resData };

    } catch (e) {
      var res = errorService.checkErrors(e);

      if (
        res &&
        typeof res === 'object' &&
        res.constructor === Object &&
        res.hasOwnProperty('status')
      ) {
        return res;
      }
      throw e;
      return { status: false, msg: "Something Went wrong" };
    }
  },
  // updateprofile: async

  getprofile: async function (

  ) {
  
    var DEMO_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDIyMTAyMDg5Mzg3Nzg2NzgiLCJpYXQiOjE2NjYyNjE3MjgsImV4cCI6MTY2NjM0ODEyOH0.WrfB8qUTKVIYzETUdaTf2AzSmH9eq_fS8UmF68vkHOF361x6_B7jTTAAKt5xxv2Rg3R8f6mbTANLTqG9hWw8qg';
    var DEMO_TOKEN2 = "wm22UYQ6JBbpL72Sr8zBTavFJfyo2YTa7ZHdCjMFxWEspAMvg7l3fzHHTAmdsyIbecRH3WE5TCeEd5Z0sZGKHZZXloqFArNkfhkGkiluvRSMbbNDJJeL3EgfrtcFYreS202210157368977888";
    let API = apiService.getprofile;
    try {
      let params = {
        // dealer_pin_code: customer_pincode,
      };
      //console.log('12', params, API);
      let queryParams = queryService.preareQueryParams(params);
      console.log(DEMO_TOKEN);
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'Bearer ' + DEMO_TOKEN
        },
        // body: queryParams,
      });
      const resData = await response.json();
      console.log(resData);
      if (!resData.success) {
        const message = resData.msg;
        const errorRes = {
          status: false,
          data: message,
          code: resData.success,
          msg: message,
        };
        // console.log(resData);
        const sessionResp = errorService.checkSession(errorRes);
        return sessionResp;
      }
      return { status: true, data: resData.data };
    } catch (error) {
      var res = errorService.checkErrors(error);
      if (
        res &&
        typeof res === 'object' &&
        res.constructor === Object &&
        res.hasOwnProperty('status')
      ) {
        return res;
      }
      throw error;
    }
  },
};
export default fetchService;