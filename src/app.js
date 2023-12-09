const nodemailer = require("nodemailer");

// Create a transporter object using your SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail", // Change to your email service provider
  auth: {
    user: "mzskhan626@gmail.com", // Your email address
    pass: "", // Your password or an app-specific password
  },
});

// Define the email data
const mailOptions = {
  from: "mzskhan626@gmail.com",
  to: "recipient@example.com",
  subject: "Test Email",
  text: "This is a test email sent from Node.js.",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error sending email: " + error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

// Close the transporter when you're done
transporter.close();
