function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Simple validation
  if (name === "" || email === "" || subject === "" || message === "") {
    showError("Please fill in all fields.");
    return false;
  }

  // Advanced email validation using a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("Please enter a valid email address.");
    return false;
  }

  // Check if the email domain is valid
  var validEmailDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "aol.com",
    "icloud.com",
    "protonmail.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
    "example.com",
    "yourdomain.com",
    "edu.com",
    "university.edu",
    "schoolmail.org",
    "studentmail.edu",
    "collegeemail.net",
    "learnmail.com",
    "academicmail.org",
    "researchermail.net",
  ];
  var domain = email.split("@")[1];
  if (!validEmailDomains.includes(domain)) {
    showError("Please enter a valid email domain.");
    return false;
  }

  // Advanced name validation (alphabetic characters only, 3-25 characters)
  var nameRegex = /^[a-zA-Z\s]{3,25}$/;
  if (!nameRegex.test(name)) {
    showError(
      "Please enter a valid name (alphabetic characters only, 3-25 characters)."
    );
    return false;
  }

  // Advanced subject validation (specific format)
  var subjectRegex = /^[a-zA-Z0-9\s]{3,15}$/;
  if (!subjectRegex.test(subject)) {
    alert("Please enter a valid subject (3-15 characters, alphanumeric).");
    return false;
  }

  // Advanced message validation (minimum length and no restricted words)
  if (message.length < 10) {
    showError("Please enter a message with at least 10 characters");
    return false;
  }

  // If all validations pass, submit the form using AJAX
  submitForm();
  return false;
}

function showError(errorMessage) {
  Swal.fire({
    icon: "error",
    title: "Validation Error",
    text: errorMessage,
  });
}

function submitForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Validate the form
  if (!validateForm()) {
    return;
  }

  // Prepare data for the POST request
  var formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("subject", subject);
  formData.append("message", message);

  // Simulate AJAX submission using Fetch API
  fetch("", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      if (data.status === "success") {
        // Display a success message
        Swal.fire({
          icon: "success",
          title: "Form submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form after successful submission (optional)
        resetForm();
      } else {
        // Display an error message
        Swal.fire({
          icon: "error",
          title: "Form submission failed",
          text: data.message, // Display the server error message if available
        });
      }
    })
    .catch((error) => {
      console.error("Error submitting the form:", error);

      // Handle errors, if needed
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    });
}

function resetForm() {
  // Reset form fields as needed
  document.getElementById("form").reset();
}
