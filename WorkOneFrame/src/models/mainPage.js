import * as Services from '../services/mainService';
export default {
  namespace: 'mainPage',

  state: {
    activeMenuKey: window.location.hash.replace('#', ''),
    registrationNo: '',
    systemAdList: [],
    languageType: false,
    sliderMenuList: []
  },
  effects: {
    *qryBanner({ payload }, { call, put }) {
      const { resultCode, result } = yield call(Services.qryBanner);
      if (resultCode - 0 === 0) {
        yield put({
          type: 'save',
          payload: {
            systemAdList: result
          },
        });
      }
    },
    *qryMenu({ payload }, { call, put }) {
      const { resultCode, result } = yield call(Services.qryMenu, { ...payload });
      if (resultCode - 0 === 0) {
        const { MENU_LIST } = result;
        yield put({
          type: 'save',
          payload: {
            sliderMenuList: MENU_LIST
          },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
