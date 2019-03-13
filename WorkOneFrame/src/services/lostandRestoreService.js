import axios from '../utils/http';

export function querySimCardOptHisAPI(data) {
  return axios({
    method: 'POST',
    url: '/api/subs/querySimCardOptHis',
    data
  });
}
export function qryOrderReasonAPI(data) {
  return axios({
    method: 'POST',
    url: '/api/subs/qryOrderReason',
    data
  });
}

export function simCardLostAPI(data) {
  return axios({
    method: 'POST',
    url: '/api/subs/simCardLost',
    data
  });
}

export function simCardRestoreAPI(data) {
  return axios({
    method: 'POST',
    url: '/api/subs/simCardRestore',
    data
  });
}
