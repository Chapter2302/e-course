const nodeMailer = require("nodemailer")

const adminEmail = "chapterchapter2302@gmail.com"
const adminPassword = "17110265chapter"

const mailHost = "smtp.gmail.com"

const mailPort = 587

const teacherContent = (name, link) =>  
    (`
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Notification: Teaching Time</h4>
                <span style="color: black">Course: ${name}</span>
                <a href="${link}">Click Here To Enter The Class</a>
            </div>
        </div>
    `)

const studentContent = (name, link) => 
    (`
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Notification: Learning Time</h4>
                <span style="color: black">Course: ${name}</span>
                <a href="${link}">Click Here To Join The Class</a>
            </div>
        </div>
    `)

const sendMail = (user, course) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  })

  const content = user.role == "teacher" ? teacherContent(course.name, course.link) : studentContent(course.name, course.link) 

  const options = {
    from: adminEmail, 
    to: user.authenticateMethod.local.email,
    subject: "Notification To Our Class", 
    html: content
  }
  
  return transporter.sendMail(options)
}

module.exports = {
  sendMail: sendMail
}