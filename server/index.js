

// DISCLAIMER
// This is a very simple server
// most of the code came from here https://hapijs.com/tutorials#installing
// This is in not a reflection of what a proper production ready
// orchestration service would look like


const Hapi = require('@hapi/hapi');
const axios = require('axios');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:*'], // Allow localhost to violate cors, in a normal setup this server would also be serving the webPage so cors wouldn't be an issue
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/api/venues/{query}/latlong/{latlong}',
    handler: request => axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=${process.env.API_VERSION}&limit=50&query=${request.params.query}&ll=${request.params.latlong}`)
      .then((response) => {
        // handle success
        console.log('Recieved data');
        return response.data.response;
      })
      .catch((error) => {
        console.log('Something went wrong');
        return error;
      }),
  });

  server.route({
    method: 'GET',
    path: '/api/venues/{query}/near/{near}',
    handler: request => axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=${process.env.API_VERSION}&limit=50&query=${request.params.query}&near=${request.params.near}`)
      .then((response) => {
        // handle success
        console.log('Recieved data');
        return response.data.response;
      })
      .catch((error) => {
        console.log('Something went wrong');
        return error;
      }),
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
