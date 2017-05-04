import axios from 'axios';

const URL = 'http://localhost:3000/nearbySnypprs';

exports.FetchSnypprs = (address) => {
  console.log(address);
  const request = axios.get(`${URL}/${address}`);
  console.log('fetch barbers ran');
  return ({
    type: 'FETCH_SNYPPRS',
    payload: request,
  });
};

