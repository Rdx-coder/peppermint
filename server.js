const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Serve static files (index.html, apply.html, styles.css, etc.)
app.use(express.static('public'));

app.post('/submit-application', (req, res) => {
    const formData = req.body;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password',
        },
    });

    // Email configuration
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'rd@gmail.com', // Change to your company's email
        subject: 'New Job Application',
        text: `New job application received from ${formData.name} (${formData.email})`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Application submitted successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
