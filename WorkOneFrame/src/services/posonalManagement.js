import axios from '../utils/http';

export function posonalManagement(data) {
  console.log(data)
  return axios({
    method: 'POST',
    url: '/api/subs/querySimCardOptHis',
    data
  });
}