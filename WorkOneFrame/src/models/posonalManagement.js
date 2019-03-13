import { posonalManagement } from '../services/posonalManagement';
import { notification } from 'antd';
export default {
  namespace: 'posonalManagement',

  state: {

  },

  effects: {
    *posonalManagement({ payload }, { call, put }) {
      console.log(payload)
      const result = yield call(posonalManagement, payload);
      console.log(result);
    }
  },

  reducers: {

  },
};