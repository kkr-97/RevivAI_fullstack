import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWeeklyEmail = async (recipient, moment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "7e45d8001@smtp-brevo.com",
    to: recipient,
    subject: "Your Weekly Moment",
    text: `Here's a moment from your week:\n\n${moment}`,
  };

  await transporter
    .sendMail(mailOptions)
    .then((info) => console.log("Message Sent Successfully", info.response))
    .catch((err) => console.error("Error while send mail: ", err));
};

sendWeeklyEmail(
  "kollikeerthan07@gmail.com",
  "Hello ra Yerrinayala, this is for testing purpose"
);

console.log("MAIL SERVICE");
