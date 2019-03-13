import axios from 'axios';
import { notification } from 'antd';
import router from 'umi/router';
import emptyBrowserStorage from './emptyBrowserStorage';

// // axios拦截器
function ErrorHandler(errorMsg) {
  notification.error({
    message: 'Error',
    description: errorMsg,
  });
}
function requestHandler(config) {
  config.headers['SESSION-ID'] = sessionStorage.getItem('SESSION-ID') || '';
  return config;
}
// axios.defaults.baseURL= 'http://10.45.104.101:8083';

axios.defaults.timeout = 30000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'x-requested-with,content-type';
axios.defaults.headers.common['Accept'] = '*/*';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      // 添加时间戳参数
      config.params = {
        _t: +new Date(),
        ...config.params,
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//设置默认请求头
axios.interceptors.request.use(requestHandler);
// axios拦截器
axios.interceptors.response.use(response => {
  // debugger;
  // 在这里你可以判断后台返回数据携带的请求码
  if (response.status === 200) {
    const resultCode = response.data.resultCode - 0;
    const pathname = window.location.hash.toLowerCase();

    if (resultCode === 1) {
      ErrorHandler(response.data.resultDesc || 'Internet Error');
      return { resultCode: '1' };
    }
    if (resultCode === 5) {//no session
      setTimeout(() => {
        emptyBrowserStorage();
        router.push('/Login');
      }, 100);
    }
    if ([2, 3, 4, 6].some(item => item === resultCode) && pathname !== '#/login') {
      ErrorHandler(response.data.resultDesc);
      setTimeout(() => {
        emptyBrowserStorage();
        router.push('/Login');
      }, 2000);
    }
    if (response.data.result && response.data.result.hasOwnProperty('SESSION-ID') && response.data.result['SESSION-ID']) {
      sessionStorage.setItem('SESSION-ID', response.data.result['SESSION-ID']);
    }
    return response.data.data || response.data;
  }
}, err => {
  if (err.response && err.response.data) {
    // 非200请求抱错
    ErrorHandler(err.response.data.error);
    return { resultCode: '1' };
  } else {
    ErrorHandler('Internet Error');
    return { resultCode: '1' };
  }
});
export default axios;
