const express = require('express');
const dotenv = require('dotenv');
const twilio = require('twilio');
const app = express();
dotenv.config();
//use to middleware to accept json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//template engine
app.set('view engine', 'ejs');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
    const { to, message } = req.body;
    try {
        const result = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });
        res.status(200).json({
            sid: result.sid,
            message: 'sms send successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to send sms',
            error: error.message
        })
    }
});

app.get('/', (req, res) => {
    res.render('send-sms');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
