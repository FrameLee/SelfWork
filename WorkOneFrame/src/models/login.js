import { getMsgCodeAPI, getSMSCodeEffTimeAPI, getErrorCountsAPI, getSMSAPI, login, loginWithSmsCodeAPI, register, forgetPwd, logout, getPasswordComplexityAPI } from '../services/loginService';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
// import emptyBrowserStorage from '../utils/emptyBrowserStorage';
export default {
  namespace: 'login',

  state: {
    current: 'Individual',
    currentAccount: '',
    verCode: '1234',
    errorCounts: 0,
    SMSCodeEffTime: 60,
    loginInfo: {},
    passwordComplexity: {
      COMMENTS: '',
    }

  },

  effects: {
    *getSMS({ payload }, { call, put }) {
      const { result } = yield call(getSMSAPI, payload);
      console.log(result);
    },
    *getMsgCode({ payload }, { call, put }) {
      const { resultCode, verCode } = yield call(getMsgCodeAPI, payload);
      if (resultCode.toString() === '0') {
        yield put({
          type: 'saveOTPCode',
          payload: {
            OTPCode: verCode
          }
        });
      }
    },
    *login({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { result, resultCode } = yield call(login, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        yield put({
          type: 'loginInfoSave',
          payload: result
        });
        sessionStorage.setItem('loginInfo', JSON.stringify(result));
        yield put(routerRedux.push('/')); // 路由跳转
      }
      else {
        yield put({
          type: 'getErrorCounts'
        });
      }
    },
    *loginWithSmsCode({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { result, resultCode } = yield call(loginWithSmsCodeAPI, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        yield put({
          type: 'loginInfoSave',
          payload: result
        });
        sessionStorage.setItem('loginInfo', JSON.stringify(result));
        yield put(routerRedux.push('/')); // 路由跳转
      }
      else {
        yield put({
          type: 'getErrorCounts'
        });
      }
    },
    // *resetPwd({ payload }, { call, put }) {
    //   const { resultCode, resultDesc } = yield call(resetPwd, payload);
    //   if (resultCode.toString() === '0' || resultDesc === 'success') {
    //     yield put({
    //       type: 'changeSnpMsgStatus',
    //       payload: {
    //         snpMsgStatus: true
    //       }
    //     })
    //   }
    // },
    *register({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { resultCode, resultDesc, result } = yield call(register, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        notification.success({
          message: resultDesc,
          description: result
        })
      }
    },
    *logout({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { resultCode } = yield call(logout, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        // yield emptyBrowserStorage(); // 会把记住的账号密码也清除掉
        yield sessionStorage.clear();
        yield document.cookie = 'SESSION=0;expires=' + new Date(0).toUTCString();
        yield put(routerRedux.push('/login')); // 路由跳转
      }
    },
    *forgetPwd({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { resultCode } = yield call(forgetPwd, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        yield put({
          type: 'saveAccount',
          payload: {
            currentAccount: payload.ACC_NBR
          }
        });
        yield put({
          type: 'changeBox',
          payload: {
            current: 'SetNewPassword'
          }
        });
      }
      else {
        yield put({
          type: 'getErrorCounts'
        });
      }
    },
    *getErrorCounts(_, { call, put }) {
      const { result: { PARAM_VALUE } } = yield call(getErrorCountsAPI);
      if (Number.parseInt(PARAM_VALUE, 10) === 5) {
        yield put({
          type: 'changeBox',
          payload: {
            current: 'AccountLocked'
          }
        });
      }
      yield put({
        type: 'saveErrorCounts',
        payload: {
          errorCounts: PARAM_VALUE
        }
      });
    },
    *getSMSCodeEffTime(_, { call, put }) {
      const { result: { PARAM_VALUE } } = yield call(getSMSCodeEffTimeAPI);
      yield put({
        type: 'saveSMSCodeEffTime',
        payload: {
          SMSCodeEffTime: PARAM_VALUE
        }
      })
    },
    *getPasswordComplexity(_, { call, put }) {
      const { result } = yield call(getPasswordComplexityAPI);
      yield put({
        type: 'savePasswordComplexity',
        payload: {
          passwordComplexity: result
        }
      })
    }
  },
  reducers: {
    changeBox(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    saveAccount(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    saveErrorCounts(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    saveOTPCode(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    loginInfoSave(state, { payload }) {
      sessionStorage.setItem('ACC_NBR', payload.ACC_NBR);
      return {
        ...state,
        loginInfo: payload,
        currentAccount: payload.ACC_NBR
      };
    },
    getVerificationCode(state, { payload }) {
      let verCode = '';
      for (let i = 0; i < 4; i++) {
        verCode += Math.floor(Math.random() * 10).toString();
      }
      return {
        ...state,
        verCode
      };
    },
    saveSMSCodeEffTime(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    savePasswordComplexity(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  }
};
