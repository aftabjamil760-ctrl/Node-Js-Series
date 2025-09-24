const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, //STARTTLS 
    auth: {
        user: 'aftabjamil1056@gmail.com',
        pass: 'fhogujarlinkbntz'
    }
})

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const info = await transporter.sendMail({
            from: '"Aftab Jamil" <aftabjamil1056@gmail.com>',
            to: to,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: 'Disk_Management_and_Protection.pdf',
                    path: path.join(__dirname, 'files', 'Disk_Management_and_Protection.pdf') // Assuming you have a text file to attach
                }
            ]

        });
        res.json({ message: 'Email sent successfully', info });
    } catch (error) {

        res.status(500).json({ message: 'failed sending email', error });
    }
});



// route homepage
app.get('/', (req, res) => {
    res.render('send-email');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
