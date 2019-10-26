let pg = require('pg');
let conf = require('../config/config');
const pg = require('pg');
const conf = require('../config/config');
let PGSQL = function () {
    console.log("准备向****数据库连接...");
};

let clientQuery = function (str, value, cb) {
    let SITE = GetSite.SitePool();
    let pool = new pg.Pool(conf[SITE + 'DATABASE']);
    pool.connect().then(client => {
        client.query(str, value).then(res => {
            cb(null, res.rows);
            client.release();
        }, reason => {
            cb(reason);
            client.release();
        }).catch(e => {
            cb(e);
            client.release();
            console.error('query error', e.message);
        })
    }).catch(e => {
        cb(e);
        console.error('connect error', e.message);
    })
}

PGSQL.prototype.getConnection = function () {
    pool.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        console.log("xxxxxx数据库连接成功...");
    });
};

//增  
//@param tablename 数据表名称  
//@param fields 更新的字段和值，json格式  
//@param cb 回调函数  
PGSQL.prototype.insert = function (tablename, fields, cb) {
    if (!tablename) return;
    var str = "insert into " + tablename + "(";
    var field = [];
    var value = [];
    var num = [];
    var count = 0;
    for (var i in fields) {
        count++;
        field.push(i);
        value.push(fields[i]);
        num.push("$" + count);
    }
    str += field.join(",") + ") values(" + num.join(",") + ")";
    clientQuery(str, value, cb);
};

//删除  
//@param tablename 数据表名称  
//@param fields 条件字段和值，json格式  
//@param cb 回调函数  
PGSQL.prototype.remove = function (tablename, fields, cb) {
    if (!tablename) return;
    var str = "delete from " + tablename + " where ";
    var field = [];
    var value = [];
    var count = 0;
    for (var i in fields) {
        count++;
        field.push(i + "=$" + count);
        value.push(fields[i]);
    }
    str += field.join(" and ");
    clientQuery(str, value, cb);
}

//修改  
//@param tablename 数据表名称  
//@param fields 更新的字段和值，json格式  
//@param mainfields 条件字段和值，json格式  
PGSQL.prototype.update = function (tablename, mainfields, fields, cb) {
    if (!tablename) return;
    var str = "update " + tablename + " set ";
    var field = [];
    var value = [];
    var count = 0;
    for (var i in fields) {
        count++;
        field.push(i + "=$" + count);
        value.push(fields[i]);
    }
    str += field.join(",") + " where ";
    field = [];
    for (var j in mainfields) {
        count++;
        field.push(j + "=$" + count);
        value.push(mainfields[j]);
    }
    str += field.join(" and ");
    clientQuery(str, value, cb);
}

//查询  
//@param tablename 数据表名称  
//@param fields 条件字段和值，json格式  
//@param returnfields 返回字段  
//@param cb 回调函数  
PGSQL.prototype.select = function (tablename, fields, returnfields, cb) {
    if (!tablename) return;
    var returnStr = "";
    if (returnfields.length == 0)
        returnStr = '*';
    else
        returnStr = returnfields.join(",");
    var str = "select " + returnStr + " from " + tablename + " where ";
    var field = [];
    var value = [];
    var count = 0;
    for (var i in fields) {
        count++;
        field.push(i + "=$" + count);
        value.push(fields[i]);
    }
    str += field.join(" and ");
    clientQuery(str, value, cb);
};

/**
 * 执行sql语句
 * @param {*} sqlStr sql字符串
 * @param {*} valueArr 数组value
 * @param {*} cb 回调函数
 */
PGSQL.prototype.querySql = function (sqlStr, valueArr, cb) {{
    var value = [];
    if(Array.isArray(valueArr)){
        value = valueArr;
    }
    clientQuery(str, value, cb);
};
}
module.exports = new PGSQL();