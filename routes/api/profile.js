const express = require("express")
const router = express.Router();
const auth = require("../../middleware/auth.js");
const Profile = require("../../models/Profile.js");
const User = require("../../models/Users.js");
const { check, validationResult } = require("express-validator");

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

// @route POST api/profile
// @desc Create and Update profile
// @access Private
router.post('/', [auth,
    [
        check("status", "Status is required!").not().isEmpty(),
        check("skills", "Skills are required!").not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build Social Object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    // Storing and updating

    try {

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // if profile found then we update it
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }

        // Creating profile

        profile = new Profile(profileFields);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/profile
// @desc Get All Profiles
// @access Public
router.get("/", async (req, res) => {
    try {
        const allProfiles = await Profile.find().populate("user", ['name', 'avatar']);
        res.json(allProfiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/profile/user/:user_id
// @desc Get user profile by user id
// @access Public
router.get("/user/:user_id", async (req, res) => {
    try {
        const userProfile = await Profile.findOne({ user: req.params.user_id }).populate("user", ['name', 'avatar']);

        if (!userProfile) {
            return res.status(400).json({ msg: "No profile found for this user." });
        }

        res.json(userProfile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "No profile found for this user." });
        }
        res.status(500).send("Server error");
    }
});

// @route DELETE api/profile
// @desc Delete profile , user , user-post
// @access Private
router.delete("/", auth, async (req, res) => {
    try {
        //@todo - delete user-post

        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User deleted." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route PUT api/profile/experience
// @desc Update or create experience in profile
// @access Private
router.put("/experience", [auth,
    [
        check("title", "Title is required.").not().isEmpty(),
        check("company", "Company name is required.").not().isEmpty(),
        check("from", "From date is required.").not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { 
        title, 
        company, 
        location, 
        from, 
        to, 
        current, 
        description 
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
})

module.exports = router;