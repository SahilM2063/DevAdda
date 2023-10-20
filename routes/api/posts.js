const express = require("express")
const router = express.Router();
const auth = require("../../middleware/auth.js");
const Post = require("../../models/Posts.js")
const Profile = require("../../models/Profile.js");
const User = require("../../models/Users.js");
const { check, validationResult } = require("express-validator");


// @route POST api/posts
// @desc Creating Post 
// @access Private
router.post('/', [auth,
    [
        check('text', "Text is required.").not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save()

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/posts
// @desc Get all Posts 
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }) // date : -1 means (last created is first) its default (date : 1)
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;