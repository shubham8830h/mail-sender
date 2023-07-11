// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// // const OAuth2=google.auth.OAuth2

// async function sendEmail() {
//   // Create a new OAuth2 client
//   const oAuth2Client = new google.auth.OAuth2(
//     "1028944871062-of6plp1msgd6bnbi802drfdha9tvea8p.apps.googleusercontent.com",
//     "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"
//   );

//   // Set the refresh token
//   oAuth2Client.setCredentials({
//     refresh_token:
//       "1//04yMpn3ig1JJTCgYIARAAGAQSNwF-L9IrkDHJWEEEbwyCeBZQ948S5f8oNyAjcRBuVYe3uRvBNu0eVNyibP45xkLx8T9LUkx-NaE",
//   });

//   try {
//     // Get an access token
//     const accessToken = await oAuth2Client.getAccessToken();

//     // Create a Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "sh9422602@gmail.com",
//         clientId:
//           "1028944871062-of6plp1msgd6bnbi802drfdha9tvea8p.apps.googleusercontent.com",
//         clientSecret: "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",
//         refreshToken:
//           "1//04yMpn3ig1JJTCgYIARAAGAQSNwF-L9IrkDHJWEEEbwyCeBZQ948S5f8oNyAjcRBuVYe3uRvBNu0eVNyibP45xkLx8T9LUkx-NaE",
//         accessToken:accessToken
//       },
//     });

//     console.log(transporter.options.auth);
//     // Compose the email
//     const mailOptions = {
//       from: "sh9422602@gmail.com",
//       to: "shubhamhanamane1111@gmail.com",
//       subject: "Nodemailer Test",
//       html: "Test <button>sending</button> Gmail using Node JS",
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.log("Error:");
//     console.log(error);
//   }
// }

// sendEmail();

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "sh9422602@gmail.com",
//     pass: "imoxeldkugdowxic",
//   },
// });

// const mailOptions = {
//   from: "sh9422602@gmail.com",
//   to: "shubhamhanamane1111@gmail.com",
//   subject: "Nodemailer Test",
//   html: "Test <button>sending</button> Gmail using Node JS",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log("error");
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

//%systemroot%\system32\LogFiles\Firewall\pfirewall.log

const express = require("express");
const app = express();
let PORT = 5000;

const sendMail = require("./controller/sendmail");

app.get("/", (req, res) => {
  res.send("I am a server");
});

app.get("/mail", sendMail);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`I am live in port no.  ${PORT}`);
    });
  } catch (error) {}
};

start();
