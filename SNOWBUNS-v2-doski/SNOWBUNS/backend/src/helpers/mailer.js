const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: process.env.EMAIL_SMTP_HOST,
//   port: process.env.EMAIL_SMTP_PORT,
//   //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
//   auth: {
//     user: process.env.EMAIL_SMTP_USERNAME,
//     pass: process.env.EMAIL_SMTP_PASSWORD,
//   },
// });

// exports.send = function (from, to, subject, html) {
//   // send mail with defined transport object
//   // visit https://nodemailer.com/ for more options
//   return transporter.sendMail({
//     from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
//     to: to, // list of receivers e.g. bar@example.com, baz@example.com
//     subject: subject, // Subject line e.g. 'Hello ✔'
//     //text: text, // plain text body e.g. Hello world?
//     html: html, // html body e.g. '<b>Hello world?</b>'
//   });
// };

const { google } = require("googleapis");

// OAuth2 Configuration
const CLIENT_ID =
  "633675213470-9blclndskng9mu745eqep9a3gutgk85j.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "your-refresh-token";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendMail = async function (from, to, subject, html) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "your-email@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// sendMail();
