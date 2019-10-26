/** 
 * 应用程序的入口文件
*/
//加载express模块
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const api = require('./routes/api');
const logConfig = require('./logs/logconfig/logconfig');
const requestLogger = logConfig.getLogger();//根据需要获取logger
const loginFlag = require('./routes/checklogin');
const app = express();
//设置跨域访问
app.all('*', function (req, res, next) {
  if(req.headers.origin) {
      res.header("Access-Control-Allow-Origin", `${req.headers.origin}`);
  } else {
    res.header("Access-Control-Allow-Origin", `*`);
  }
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token, x-access-site");
  res.header("Access-Control-Expose-Headers", "*");
    if(req.method === "OPTIONS") {
      return res.end();
  } 
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
logConfig.useLogger(app, requestLogger);
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb',extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//MARK:  健康检查
app.get('/healthz', (req, res) => {
  res.status(200).send({
    error: false,
    result: 'healthz working'
    })
});

// //先检查是否登录
app.use('/api', (req, res, next) => {
  loginFlag.authentication(req, res, next);
})

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
module.exports = app;
