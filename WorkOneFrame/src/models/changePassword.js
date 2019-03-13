import { resetPwd } from '../services/loginService';
import { notification } from 'antd';
export default {
  namespace: 'changePassword',

  state: {

  },

  effects: {
    *changePassword({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { resultCode } = yield call(resetPwd, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        notification.success({
          message: 'Success',
          description: 'You had change the password'
        })
      }
    }
  },

  reducers: {

  },
};
