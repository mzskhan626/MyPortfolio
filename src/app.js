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

// Second way to do

function submitForm() {
  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Assuming you have a server-side endpoint to handle email sending
  const endpoint = "";

  // Create a data object to send to the server
  const data = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  // Send data to the server using fetch
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Message sent successfully");
        // You can also reset the form if needed
        document.getElementById("contactForm").reset();
      } else {
        alert("Error sending message");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error sending message");
    });
}
