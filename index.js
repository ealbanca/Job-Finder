const express = require('express');
const BodyParser = require('body-parser');
const morgan = require('morgan');
const {engine}  = require('express-handlebars');

const mongodb = require('./db/connect');
// Got this code from https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;
const app = express();

//Handlebars to handle the views, got it from https://www.npmjs.com/package/express-handlebars
app.engine('.hbs', engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

// parse application/json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // Swagger UI route, got it from https://www.npmjs.com/package/swagger-ui-express
app.use(BodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
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