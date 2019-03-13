import { qryOrderReasonAPI, simCardLostAPI, simCardRestoreAPI, querySimCardOptHisAPI } from '../services/lostandRestoreService';
export default {
  namespace: 'lostandRestore',

  state: {
    totalSize: 0,
    currentPage: 1,
    loading: false,
    dataList: [],
    lostReason: [],
    restoreReason: []
  },

  effects: {
    *qryOrderReason({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { result, resultCode } = yield call(qryOrderReasonAPI, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        if (payload.SUBS_EVENT_ID === 68) {
          yield put({
            type: 'save',
            payload: {
              lostReason: result
            }
          })
        }
        else {
          yield put({
            type: 'save',
            payload: {
              restoreReason: result
            }
          })
        }
      }
    },
    *querySimCardOptHis({ payload }, { call, put }) {
      yield put({ type: 'layouts/increaseRequest' });
      const { result, resultCode } = yield call(querySimCardOptHisAPI, payload);
      yield put({ type: 'layouts/decreaseRequest' });
      if (resultCode.toString() === '0') {
        yield put({
          type: 'save',
          payload: {
            dataList: result
          }
        });
      }
    },
    *simCardLost({ payload }, { call, put }) {
      const data = yield call(simCardLostAPI, payload || {});
      console.log(data);
    },
    *simCardRestore({ payload }, { call, put }) {
      const data = yield call(simCardRestoreAPI, payload || {});
      console.log(data);
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};
