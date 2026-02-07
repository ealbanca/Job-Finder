const express = require('express');
const mongodb = require('./db/connect');
const BodyParser = require('body-parser');

// Got this code from https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;
const app = express();


// parse application/json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // Swagger UI route, got it from https://www.npmjs.com/package/swagger-ui-express
app.use(BodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
// routes
app.use('/', require('./routes'));


mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Connected to MongoDB and listening on port ' + port);
    }
});