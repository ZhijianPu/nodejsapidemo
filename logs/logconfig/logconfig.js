const log4js = require('log4js');
const logConfigObj = require('./logconfigureobj');
let logConfig = {};
log4js.configure(logConfigObj);

logConfig.getLogger = function (name) {//name取categories项
    return log4js.getLogger(name || 'default');
}
 
logConfig.useLogger = function (app, logger) {//用来与express结合
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr] [:method] [:url] [:status] [:response-timems][:referrer HTTP/:http-version :user-agent]',//自定义输出格式
        level: 'auto'
    }));
}
module.exports = logConfig;