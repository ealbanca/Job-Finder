const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Job Finder API',
    description: 'Job Finder API',
  },
  host: 'https://job-finder-0jxj.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);