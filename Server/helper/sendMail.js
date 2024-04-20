const nodemailer = require("nodemailer")

async function sendMail({ to, text }) {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_DETAILS,
            pass: process.env.PASS
        }
    })

    const mailingDetails = {
        from: process.env.USER_DETAILS,
        to: to,
        subject: "User Details for Task Management",
        text: text
    }

    mailTransporter.sendMail(mailingDetails, function (err, data) {
        if (err) {
            console.log(err)
        }else {
            console.log("Mail has been sent successfully")
        }
    })
}

module.exports = {sendMail};