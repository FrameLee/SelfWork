export default {
  namespace: 'layouts',

  state: {
    requestQuantity: 0
  },

  reducers: {
    increaseRequest(state) {
      let { requestQuantity } = state;
      return {
        ...state,
        requestQuantity: ++requestQuantity,
      };
    },
    decreaseRequest(state) {
      let { requestQuantity } = state;
      return {
        ...state,
        requestQuantity: --requestQuantity,
      };
    },
  },
};
