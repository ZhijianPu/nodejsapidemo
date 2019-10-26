const Util = require('../../utils/utils');
const nodemailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64'); 
const SendEmail= {};

SendEmail.SendEmail = (contents) => {
    return new Promise((resolve, reject) => {
    let trans = nodemailer.createTransport({ignoreTLS:true,host:"corimc04",secureConnection:false}); 
    trans.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));    
    trans.sendMail({
                    from: contents.from, 
                    to: contents.to, 
                    subject: contents.subject, 
                    html: contents.html}, 
                    (err, result) => {
                        if(err) {
                            reject(err);
                        }
                        resolve(result);
                    })
    });
    trans.close();
}
module.exports = SendEmail;