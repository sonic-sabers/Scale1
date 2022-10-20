const baseUrl = 'http://65.1.71.77:8081/apisrtest/';
const apiService = {

  Login: baseUrl + 'auth/login',
  verifyotp: baseUrl + 'auth/verifyotp',
  
  updateprofile: baseUrl + 'v1/profile/updateprofile',
  getprofile: baseUrl + 'v1/profile/getprofile',
  
  getorder: baseUrl + 'v1/order/getorder',
  
  getproduct: baseUrl + 'v1/product/getproduct',
  // getprofile: baseUrl + 'v1/profile/getprofile',
  // getprofile: baseUrl + 'v1/profile/getprofile',
  // getprofile: baseUrl + 'v1/profile/getprofile',


};

export default apiService;