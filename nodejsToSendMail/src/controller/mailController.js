const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shubhamhanamane1111@gmail.com",
    pass: "jmqrivwbydizgfzk",
  },
});

let mailOptions = {
  from: "shubhamhanamane1111@gmail.com",
  to: "shubhamhanamane1111@gmail.com",
  subject: "Testing node Js project",
  text: "It,s working fine",
};

const mail = async() => {
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error Occured" + err);
    } else {
      console.log("Email sent To:", mailOptions.to, info.response);
    }
  });
};


const signup = async (req, res) => {
  /** testing account */
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter =await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "lenny.crist@ethereal.email",
      pass: "PHfB45DRj7XuV8rpEm",
    },
  });

  let info = await transporter.sendMail({
    from: "lenny.crist@ethereal.email", // sender address
    to: "lenny.crist@ethereal.email", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }); 

console.log("Message sent: %s", info.messageId);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // res.status(201).json("Signup Successfully...!");
};

module.exports = {mail,signup};
