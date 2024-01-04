const express = require("express")
const connectDB = require("./config/db.js")
const path = require("path")
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// init middleware
app.use(express.json({ extended: false }))

// Defining routes
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/auth', require('./routes/api/auth.js'))
app.use('/api/posts', require('./routes/api/posts.js'))
app.use('/api/profile', require('./routes/api/profile.js'))

// serve static assets in production
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", function (_, res) {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"), function (err) {
        res.status(500).send(err);
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On Port No ${PORT}.`))