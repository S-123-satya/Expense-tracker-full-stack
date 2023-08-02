const Sib = require('sib-api-v3-sdk');



module.exports.postForgetController = (req, res) => {
    const defaultClient = Sib.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SMTP_KEY_ID;
    console.log(`forget 10`);
    console.log(process.env.SMTP_KEY_ID);
    // Uncomment below two lines to configure authorization using: partner-key
    // var partnerKey = defaultClient.authentications['partner-key'];
    // partnerKey.apiKey = 'YOUR API KEY';

    const apiInstance = new Sib.TransactionalEmailsApi();
    const sender={
        email:'satyaprakash5056742@gmail.com'
    }
    const receiver={
        email:'satyaprakash5056742@gmail.com'
    }
    apiInstance.sendTransacEmail({
        sender,
        receiver,
        subject:'forget password',
        textContent:"hello satya"
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

    // var sendSmtpEmail = new Sib.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    // sendSmtpEmail = {
    //     to: [{
    //         email: 'satyaprakash5056742@gmail.com',
    //         name: 'Satya'
    //     }],
    //     subject:"forget password",
    //     htmlContent:`hello {{params.name}}`,
    //     params: {
    //         name: 'Satya',
    //     },
    // };

    // apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    //     console.log(`in success `);
    //     console.log('API called successfully. Returned data: ' + data);
    // }, function (error) {
    //     console.log(`in errror block`);
    //     console.error(error);
    // });
    res.json({ message: "forget password" })
}