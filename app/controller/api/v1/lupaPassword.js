const { PrismaClient } = require('@prisma/client')
const ejs = require('ejs')
const { sendMail, sendMailHTML } = require('../../../../utils/mailer')

const prisma = new PrismaClient();

module.exports = {

    async lupaP(req, res){
        const url = req.protocol+"://"+req.headers.host
        ejs.renderFile(__dirname + "/resetPassword.ejs", 
        { 
            url: "http://localhost:3000/api/login"
        }, 
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                sendMailHTML(email, `Halo ${name}`, data)
                }
        })

        return res.status(201).json({
            status: "Success",
            code: 200,
            message: "Berhasil Register! silahkan cek email untuk verifikasi",
        })
    },
}

