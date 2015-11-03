import React from 'react';
import express from 'express';
import webpack from 'webpack';
import { renderToStaticMarkup } from 'react-dom/server';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import api from './api';
import config, { publicPath } from '../../webpack.config';
import Page from '../common/components/Page';

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, { noInfo: true, publicPath }));
app.use(hotMiddleware(compiler));

app.use('/api', api);
app.use(express.static('public'));

app.use((req, res) => {
  const page = renderToStaticMarkup(<Page />);

  res.send('<!doctype html>' + page);
});

app.listen(port, err => {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://localhost:${port}`);
});
