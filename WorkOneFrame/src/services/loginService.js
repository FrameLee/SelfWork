import axios from '../utils/http';

export function register(data) {
  return axios({
    method: 'POST',
    url: '/api/login/register',
    data,
  });
}

export function resetPwd(data) {
  return axios({
    method: 'POST',
    url: '/api/login/resetPwd',
    data,
  });
}

export function forgetPwd(data) {
  return axios({
    method: 'POST',
    url: '/api/system/validate4ForgetPwd',
    data,
  });
}

export function login(data) {
  return axios({
    method: 'POST',
    url: '/api/login/loginWithPassword',
    data,
  });
}

export function loginWithSmsCodeAPI(data) {
  return axios({
    method: 'POST',
    url: '/api/login/loginWithSmsCode',
    data,
  });
}

export function getMsgCodeAPI(data) {
  return axios({
    method: 'POST',
    url: '/api/login/sendMsgCode',
    data
  });
}

export function getSMSAPI(data) {
  return axios({
    method: 'POST',
    url: '/api/system/sendSMS',
    data
  });
}

export function getErrorCountsAPI() {
  return axios({
    method: 'POST',
    url: '/api/common/getConfigItemValue',
    data: {
      KEY: "SC_SMS_CODE_ERROR_TIMES"
    }
  });
}

export function logout(data) {
  return axios({
    method: 'POST',
    url: '/api/login/logout',
    data
  });
}

export function getSMSCodeEffTimeAPI() {
  return axios({
    method: 'POST',
    url: '/api/common/getConfigItemValue',
    data: {
      KEY: "SC_SMS_CODE_EFF_TIME"
    }
  });
}

export function getPasswordComplexityAPI() {
  return axios({
    method: 'POST',
    url: '/api/common/getConfigItemValue',
    data: {
      KEY: "SC_SET_PASSWORD_COMPLEXITY"
    }
  });
}
