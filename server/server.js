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

// EMail Body for the Potential Client
let email_body_generator = (customer_name) => {
  const email_body = `Dear ${customer_name},<br>
  <p>Thank you for reaching out to me and for your interest in my portfolio. I appreciate the time you've taken to explore my work.</p>
  <p><strong>I strive to respond to emails within 24-48 hours, and I will make it a priority to review your message as soon as possible.</strong>
  In the meantime, feel free to explore my portfolio to gain a better understanding of my work. If there are specific details or questions you'd like me to address in my response, please let me know.
  Looking forward to connecting with you soon!</p>
  
  <br><footer>Best regards,,<br>Mohammed Khan<br>Full Stack Developer | CA, USA.</footer>`;

  return email_body
};

// Your route to check server status
app.get("/check-status", (req, res) => {
  // Respond immediately to the client
  res.status(200).send("The server is working. It works!");
});

// Your route to handle incoming data and send email
app.post("/send-email", (req, res) => {
  // Assuming your form has an input field with the name 'email'
  console.debug(JSON.stringify(req.body));
  const recipientEmail = req.body.email;
  console.log(`Recipient EMail: ${recipientEmail}`);
  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jkhan266@gmail.com", // replace with your email
      pass: `${process.env.APP_PASSWORD}`, // replace with your email password. Just simply do export APP_PASSWORD="Your Passowrd" in terminal.
    },
  });

  const mailOptionsNotification = {
    from: "jkhan266@gmail.com", // replace with your email
    to: "jkhan266@gmail.com",
    subject: `${req.body.subject}`,
    html: `<b>Client Name:</b> ${req.body.name}<br><b>EMail Address:</b> ${req.body.email}<br><b>Message:</b><br> ${req.body.text}<br><br>source:https://mzskhan626.github.io/MyPortfolio/`
  }

  // Sending Notification EMail to my inbox
  transporter.sendMail(mailOptionsNotification, (error, info) => {
    if (error) {
      console.error(`Error Occured while Sending Notification at your EMail.\n${error}`);
    } else {
      console.info("Successfully Sent Notification at Your EMail");
    }
  });

  const mailOptionsCustomer = {
    from: "jkhan266@gmail.com", // replace with your email
    to: recipientEmail,
    subject: `Auto Respones: ${req.body.subject} | Mohammed Khan`,
    // text: email_body_generator(req.body.name),
    html: email_body_generator(req.body.name)
  };

  // Sending email to customer
  transporter.sendMail(mailOptionsCustomer, (error, info) => {
    if (error) {
      console.error(error);
      // res.status(500).send("Internal Server Error");
      res.redirect(`${process.env.CLIENT_SERVER}?success=0`);
    } else {
      console.log("Email sent: " + info.response);
      // res.status(200).send("Email sent successfully");
      res.redirect(`${process.env.CLIENT_SERVER}?success=1`);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
