const log4js = require('log4js');
const logconfig= require('../logs/logconfig/logconfig');
const errLogger = logconfig.getLogger('err');
const pg = require('pg');
const conf = require('../config/config');
const CTU = `CTU`;
const WUX = `WUX`;
const CL = `CL`;
const CTUDATABASE = `CTUDATABASE`;
const WUXDATABASE = `WUXDATABASE`;
const CLDATABASE = `CLDATABASE`;
const CTUPool = new pg.Pool(conf[CTUDATABASE]);
const WUXPool = new pg.Pool(conf[WUXDATABASE]);
const CLPool = new pg.Pool(conf[CLDATABASE]);
var getSitePool = (site) => {
    switch (site) {
        case CTU:
        return CTUPool;
        case WUX: 
        return WUXPool;
        case CL: 
        return CLPool;
    } 
}
var pSqlClientExecute = (req, sql, param) => {
    let pool = getSitePool(req['headers']['x-access-site']);
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) {
                errLogger.error('[Database connect Error message::]', err.message);
                return reject(err);
            }
            client.query(sql, param, (err, result) => {
                console.log('sql', sql);
                done();
                if(err) {
                    errLogger.error('[Database Query Error message::]', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            })
        })
    })
}
module.exports = pSqlClientExecute;