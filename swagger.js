const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Job Finder API',
    description: 'Job Finder API',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);