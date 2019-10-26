var config = require('../config/config'),
    Client = require('node-rest-client').Client,
    client = new Client(),
    tokenurl = config.ssoTokenAddr + config.ssoTokenPath;
//authentication routing middleware
exports.authentication = function (req, res, next) {
    var sso_token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(sso_token) {
        let solveToken = sso_token.replace(/^\"|\"$/g,'');
        var args = {
            data: { token: solveToken},
            headers: { "Content-Type": "application/json" },
            requesConfig: { timeout: 1000 },
            responseConfig: { timeout: 2000 }
        };
        client.get(tokenurl, args, function (resObj, response) {
            // console.log(tokenurl, args);
            if (response.statusCode === 200) {
                if (resObj && resObj.data) {
                    var dataObj = resObj.data;
                    if (dataObj.error === false) {
                        req.decodedResult = dataObj.result;
                        console.log(`授权成功`);
                        next();
                    } else {
                        console.log(`授权失败!`);
                        res.status(401).send({
                            msg: dataObj.result ? dataObj.result : 'Failed to authenticate token.'
                        })
                    }
                } else {
                    console.log(`授权失败!`);
                    res.status(400).send({
                        msg: 'Failed to authenticate token. '
                    })
                }
            } else {
                console.log(`授权失败!`);
                res.status(response.statusCode).send({
                    msg: 'Failed to authenticate token. ' + response.statusMessage
                })
            }
        });
    } else {
        console.log(`授权失败!`);
        res.status(400).send({
            msg: 'Failed to authenticate token'
        })
    }
};