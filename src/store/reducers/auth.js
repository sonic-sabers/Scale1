import {CUSTOMER_TYPE, UPDATE_CUSTOMER_DATA, UPDATE_SPLASH_SCREEN, UPDATE_ADMIN_INFO, SESSION_EXPIRED} from '../actions/auth';

const initialState = {
  userMobile: "",
  userEmail: "abc@gmail.com",
  isVerified: "",
  firstName: "Sumit",
  lastName: "Singh",
  gender: "Male",
  dematNo: "asdasf123",
  userDob: "1993-05-05",
  active: false,
  profile_pic: 'https://images.pexels.com/photos/8157928/pexels-photo-8157928.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  sessionExpired: true
};

export default (state = initialState, action) => {
  console.log('action',action)
  switch (action.type) {
    case CUSTOMER_TYPE:
      return {
        ...state,
        customerType: action.custType,
      };

    case UPDATE_CUSTOMER_DATA: 
      return {
        ...state,
        firstName: action.data.customer_firstName,
        lastName: action.data.customer_lastName,
        gender: action.data.gender,
        email: action.data.email_id,
        dematNo:action.data.demat_No,
        userDob:action.data.customer_userDob,
        // customerPinCode:action.data.customer_pin_code,
        // customerImage:action.data.customer_image,
        // card_no:action.data.card_no,
        sessionExpired: action.data.sessionExpired ? true : false
      };

    case UPDATE_SPLASH_SCREEN:
        return {
          ...state,
          splashScreen: action.data,
        };

    case UPDATE_ADMIN_INFO:
      return {
        ...state,
        adminInfo: action.data ? action.data : {},
      };

    case SESSION_EXPIRED:
      return {
          ...state,
          sessionExpired: action.data
      };

    default:
      return state;
  }
};
