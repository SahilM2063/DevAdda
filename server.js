const express = require("express")
const connectDB = require("./config/db.js")
const path = require("path")

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
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/dist'))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'assets', 'index-f5aed10d.js'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}.`))