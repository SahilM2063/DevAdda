const express = require("express")
const router = express.Router();
const auth = require("../../middleware/auth.js")
const User = require("../../models/Users.js")
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route GET api/auth
// @desc Test Route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const fetchedUser = await User.findById(req.user.id).select("-password")
        res.json(fetchedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error!")
    }
})


// @route POST api/auth
// @desc Login Authorized User and get Token
// @access Public
router.post('/', [
    check("email", "Email is required!").not().isEmpty(),
    check("email", "Please enter a valid email!").isEmail(),
    check("password", "Password is required!").exists(),
], async (req, res) => {

    // validation of user using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        // check if user already exists
        let existedUser = await User.findOne({ email });

        if (!existedUser) {
            return res.status(400).json({ errors: [{ msg: "Invalid email or password!" }] });
        }

        const isMatch = await bcrypt.compare(password, existedUser.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid email or password!" }] });
        }
        // setting jsonwebtoken
        // Creating a payload which only contains user id
        const payload = {
            user: {
                id: existedUser.id
            }
        }
        // signing token and setting expiration, also error handling
        jwt.sign(payload, process.env.jwtToken, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error");
    }
})


module.exports = router;