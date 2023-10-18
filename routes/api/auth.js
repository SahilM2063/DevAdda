const express = require("express")
const router = express.Router();
const auth = require("../../middleware/auth.js")
const User = require("../../models/Users.js")

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

module.exports = router;