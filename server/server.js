const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));

// Your route to check server status
app.post("/check-status", (req, res) => {
  // Respond immediately to the client
  res.status(200).send("The server is working. It works!");
});

// Your route to handle incoming data and send email
app.post("/send-email", (req, res) => {
  // Assuming your form has an input field with the name 'email'
  const recipientEmail = req.body.email;

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mzskhan626@gmail.com", // replace with your email
      pass: "your-email-password", // replace with your email password
    },
  });

  const mailOptions = {
    from: "mzskhan626@gmail.com", // replace with your email
    to: recipientEmail,
    subject: "Subject of the email",
    text: "Body of the email",
  };

  // Sending email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});