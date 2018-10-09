import ip from 'ip';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import Express, { Router } from 'express';
import history from 'connect-history-api-fallback';
import proxyMiddleware from 'http-proxy-middleware';
import webpackMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../../config/webpack.config.dev';

const app = new Express()
  , defaultRouter = new Router();

// login
const loginRouter = new Router();

// add mock logic
require('./logic/index')(defaultRouter);
// require('./logic/users')(defaultRouter);
// require('./logic/charge')(defaultRouter);
// require('./logic/monitor')(defaultRouter);
// require('./logic/station')(defaultRouter);
// require('./logic/topic')(defaultRouter);

app.use((req, res, next) => {
  console.log('Request URL:', req.url);

  next();
});

app.use(history());

if (process.env.PROXY) {
  app.use(proxyMiddleware('/api', {
    target: 'http://10.20.0.56:8883',
    changeOrigin: true,
  })).use(proxyMiddleware('/ueditor', {
    target: 'http://172.25.29.61:8200/js',
    changeOrigin: true,
  }));
} else {
  app.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/api', defaultRouter);
}

app.use(webpackMiddleware(webpack(webpackConfig), {
  quiet: true,
  stats: {
    colors: true,
    modules: false,
  },
}));

app.listen(3003, () => console.log(`Listening on http://${ip.address()}:3003/`));
