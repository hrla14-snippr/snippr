import axios from 'axios';

const URL = 'http://localhost:3000/nearbyBarbers';

exports.FetchBarbers = (address) => {
  console.log(address);
  const request = axios.get(`${URL}/${address}`);
  console.log('fetch barbers ran');
  return ({
    type: 'FETCH_BARBERS',
    payload: request,
  });
};

