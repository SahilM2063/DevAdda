const express = require("express")
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users.js");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// @route POST api/users
// @desc Register User Route
// @access Public
router.post('/', [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Email is required!").not().isEmpty(),
    check("email", "Please enter a valid email!").isEmail(),
    check("password", "Password is required!").not().isEmpty(),
    check("password", "Password must have 6 or more characters!").isLength({ min: 6 })
], async (req, res) => {

    // validation of user using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        // check if user already exists
        let existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ errors: [{ msg: "User already exists." }] })
        }

        // get user's gravatar
        const avatar = gravatar.url(email, {
            s: "200",  // image size
            r: "pg",   // rating (like adult, pg, pg-13)
            d: "mm"    // default image
        })

        // Creating finalUser which will be registered 
        finalUser = new User({
            name,
            email,
            avatar,
            password
        });

        // hashing the password using salt and bcrypt
        const salt = await bcrypt.genSalt(10);

        finalUser.password = await bcrypt.hash(password, salt)

        await finalUser.save();

        // setting jsonwebtoken

        res.send("User Registered");
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error");
    }
})


module.exports = router;