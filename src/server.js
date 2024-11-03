/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-empty */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*'],
        },
    },
  });
  
  server.route(routes);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();