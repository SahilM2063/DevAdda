const mongoose = require("mongoose")
require("dotenv").config()

// const dbURI = process.env.mongoURI
// console.log(dbURI)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Database connected.")
    } catch (err) {
        console.error(err.message);
        process.exit(1) // for failing an app
    }
}

module.exports = connectDB;