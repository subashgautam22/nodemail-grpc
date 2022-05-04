const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "<email>",
    pass: "<password>",
  },
});
//some data
const data = [
  { relation: "father", name: "Anakin Skywalker" },
  { relation: "son", name: "Luke Skywalker" },
];
//conver the data to CSV with the column names
const csv = parse(data, ["relation", "name"]);
transporter.sendMail(
  {
    from: "darth.vader@sithmail.com",
    to: "luke.skywalker@jedimail.com",
    subject: "You need to know the truth",
    text: "Ola! Please check the attachment for a surprise 😊",
    html: "<b>Ola! Please check the attachment for a surprise! 😊</b>",
		//here is the magic
    attachments: [
      {
        filename: "file.csv",
        content: csv,
      },
    ],
  },
  (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
);