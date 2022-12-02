const nodeMailer = require('nodemailer')


const sendEmail = async(options) => {

//SMTP:Simple Mail Transfer Protocol 

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: "skanderahmed89@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions)
}


module.exports = sendEmail;