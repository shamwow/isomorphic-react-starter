require('source-map-support').install();
require('node-jsx').install();

import 'babel/polyfill';
import '../shared/utils/ArrayUtils';

import config from './appconfig';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();
app.use(morgan(config.logging));

app.use(routes);

app.listen(config.port || 5000);
