let pg = require('pg');
let conf = require('../config/config');
let pool = new pg.Pool(conf.postgresql);
module.exports = pool;