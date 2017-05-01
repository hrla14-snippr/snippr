import axios from 'axios';

const URL = 'http://localhost:3000/nearbyBarbers';

exports.FetchBarbers = () => {
  const request = axios.get(`${URL}`);
  console.log('fetch barbers ran');
  return ({
    type: 'FETCH_BARBERS',
    payload: request,
  });
};

