const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser('mySecretKey123'))


app.get('/', (req, res) => {
    var home = `Home Page`
    const username = req.cookies.username
    if (!username) {
        res.send(`${home} : No cookie found`)
    }
    res.send(`${home} : Cookie found: ${username}`)
})

app.get('/set-cookie', (req, res) => {
    res.cookie('username', "yahubaba", {
        maxAge: 900000,  // 10000 * 60 * 15 = 15mint
        httpOnly: true, //cookie only accessible by web server
        signed: true

    })
    res.send('cookie has been set')
})
app.get('/get-cookie', (req, res) => {
    // const username = req.cookies.username
    const username = req.signedCookies.username
    if (!username) {
        res.send(`No cookie found`)
    }
    res.send(`Cookie found: ${username}`)
})

app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username')
    res.send(`cookie has been deleted`)
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
