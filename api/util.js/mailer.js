const nodeMailer = require("nodemailer")

const adminEmail = "chapterchapter2302@gmail.com"
const adminPassword = "17110265chapter"

const mailHost = "smtp.gmail.com"

const mailPort = 587

const content = 
    `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Send mail with nodemailer</h4>
                <span style="color: black">This is test mail</span>
                <a href="http://localhost:4000/auth/register">Click Here To Validate Your Email</a>
            </div>
        </div>
    `

const sendMail = async (to, subject) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  })
  const options = {
    from: adminEmail, 
    to: to,
    subject: subject, 
    html: content
  }
  return await transporter.sendMail(options)
}

module.exports = {
  sendMail: sendMail
}