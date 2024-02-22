const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware to parse JSON and URL-encoded data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint for form submission
app.post('/submit-form', (req, res) => {
  // Extract data from the form submission
  const { name, email, subject, message } = req.body;

  // Check if any of the required fields are missing
  if (!name || !email || !subject || !message) {
    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  }

  // Assuming you want to use the 'email' field as the user's email
  const userEmail = email;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'divyashreey10@gmail.com',
      pass: 'umpq jgai mxqp bmvh' // Use an application-specific password for security
    }
  });

  // Email options
  const mailOptionsUser = {
    from: 'divyashreey10@gmail.com',
    to: userEmail,
    subject: 'Thank you for your message',
    text: `Dear ${name},\n\nThank you for reaching out. I'll get back to you as soon as possible.\n\nBest regards,\nDivyashree Y`
  };

  const mailOptionsAdmin = {
    from: userEmail,
    to: 'divyashreey10@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${userEmail}\nMessage: ${message}`
  };

  // Send emails
  transporter.sendMail(mailOptionsUser, (errorUser, infoUser) => {
    if (errorUser) {
      console.error('Error sending user email:', errorUser);
    }
  });

  transporter.sendMail(mailOptionsAdmin, (errorAdmin, infoAdmin) => {
    if (errorAdmin) {
      console.error('Error sending admin email:', errorAdmin);
      return res.status(500).json({ success: true, error: 'Internal Server Error' });
    }

    console.log('Emails sent successfully');
    res.json({ success: true, message: 'Emails sent successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
