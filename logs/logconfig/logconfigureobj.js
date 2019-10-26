let logConfigObj = {
        replaceConsole: true,
        appenders: {
            stdout: {//控制台输出
                type: 'console'
            },
            req: {//请求日志
                type: 'dateFile',
                filename: 'logs/logview/requestLog/',
                pattern: 'request-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            err: {//错误日志
                type: 'dateFile',
                filename: 'logs/logview/errorLog/',
                pattern: 'error-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            }
        },
        categories: {
            default: { appenders: ['stdout', 'req'], level: 'info' },//appenders:采用的appender,取appenders项,level:设置级别
            err: { appenders: ['stdout', 'err'], level: 'error' }
        }
    };
module.exports = logConfigObj;