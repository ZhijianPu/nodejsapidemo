const pSqlClientExecute = require('../../plugs/postgresqldb');
const Util = require('../../utils/utils');
const fs = require("fs");
const util = require("util");
const ejsexcel = require('../../download/ejsexcel');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const Home = {};

Home.GetActions=(req, res, next) => {
    console.log('fatppis call api {/v2/home/getactions}')
    let { Id} = req.query;
 
    let databaseFn = async function() {
        let sqlList = `SELECT "HourlyOutput_ID", "Serial", "SMTSubStation", "DTCode_ID", (select array_to_string(array(select "D/TCodeDescription" from public."FOP_DownTimeCode" 
        where "D/TCode_ID"=any(string_to_array(a."DTCode_ID",','))),',')) "DTCodeDescription", "Problem", "DownTimeRange", "DownTimeMinutes", "Action", "PIC" as "Department","DIR" as "PIC","ModuleNumber","sp_DT_TimeStampChange"("DueDate") as "DueDate", "Status_ID", "LastUpdatedUserID", "LastUpdateDateTime"
        FROM public."FOP_HourlyOutputActions" a where "HourlyOutput_ID"='${Id}'`;
        let sqlListFn = await pSqlClientExecute(req,sqlList, []);
        return sqlListFn;
    }
    databaseFn().then((data) => {
        res.send({
            status: 200,
            data: data
        });
    })
    .catch((error) => {
        res.status(400).json({
            msg: error.detail||error.message
        })
    });
};

//删除Action
Home.DeleteAction = (req, res, next) => {
    console.log('fatppis call api {/v2/home/deleteaction}')
    let { Id,Serial } = req.body;
    let databaseFn = async function() {
            let sqlDeleteAction =  `DELETE FROM public."FOP_HourlyOutputActions" WHERE  "HourlyOutput_ID"='${Id}' and "Serial"='${Serial}'`;
            let sqlDeleteActionFn =  await pSqlClientExecute(req, sqlDeleteAction, [ ]);
        }
    databaseFn().then(() => {
        res.send({
            status: 200,
            msg: 'Delete successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            msg: error.detail || error.message
        })
    })
}

module.exports = Home;
