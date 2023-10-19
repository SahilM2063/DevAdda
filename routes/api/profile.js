const express = require("express")
const router = express.Router();
const auth = require("../../middleware/auth.js");
const Profile = require("../../models/Profile.js");
const User = require("../../models/Users.js");

// @route GET api/profile/me
// @desc Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: "No profile found for this user." })
        }

        res.send(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


module.exports = router;