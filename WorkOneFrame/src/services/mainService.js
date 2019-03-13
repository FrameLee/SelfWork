import axios from '../utils/http';

export async function qryBanner(data) {
  return await axios({
    method: 'POST',
    url:`/api/system/qryBanner`,
    data,
  });
}

export async function qryMenu(data){
  return await axios({
    method: 'POST',
    url:`/api/system/qryMenuToBeTree`,
    data,
  });
}
