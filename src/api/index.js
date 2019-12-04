import axios from 'axios';

const defaultHttp = axios.create({ // Set up a http connection to our local service
  baseURL: 'http://localhost:3000/api',
  timeout: 8000,
});

// Generalizes Get requests for a given http connection
const GET = (http, url) => {
  try {
    return http.get(url).then(res => res).catch((e) => {
      throw e;
    });
  } catch (e) {
    throw (e);
  }
};

// Call our small service to get the house data
function getByGps(query, latlong) {
  return GET(defaultHttp, `/venues/${query}/latlong/${latlong}`);
}

// Call our small service to get the house data
function getByNear(query, near) {
  return GET(defaultHttp, `/venues/${query}/near/${near}`);
}

export default {
  getByGps,
  getByNear,
};
