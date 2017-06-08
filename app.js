const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pablicPath = path.join(__dirname, 'public');
const routes = require('./routes/index');
const apiRouter = require('./routes/apiRouter');
const {notFound, developmentErrors, productionErrors} = require('./handlers/errorHandlers');

require('dotenv').config({ path: 'variables.env' });

var port = process.env.PORT || 3000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(pablicPath));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:'*/*'}));

app.use('/api/', apiRouter);
app.use('/', routes);

app.use(notFound);

if (process.env.NODE_ENV==='development') {
	app.use(developmentErrors);
}

app.use(productionErrors);

app.listen(port, ()=>{
	console.log(`listening on port: ${port}`);
});