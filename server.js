const express = require("express")
const connectDB = require("./config/db.js")

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send("Api is running...."))

// Defining routes
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/auth', require('./routes/api/auth.js'))
app.use('/api/posts', require('./routes/api/posts.js'))
app.use('/api/profile', require('./routes/api/profile.js'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}.`))