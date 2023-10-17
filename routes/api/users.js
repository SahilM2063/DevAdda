const express = require("express")
const router = express.Router();
const { check, validationResult } = require("express-validator")


// @route POST api/users
// @desc Register User Route
// @access Public
router.post('/', [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Email is required!").not().isEmpty(),
    check("email", "Please enter a valid email!").isEmail(),
    check("password", "Password is required!").not().isEmpty(),
    check("password", "Password must have 6 or more characters!").isLength({ min: 6 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }else{
        res.send(req.body)
    }

    res.send("User Route")
})


module.exports = router;