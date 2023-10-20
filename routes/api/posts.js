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
});

// @route GET api/posts/:post_id
// @desc Get specific post by id 
// @access Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: "No Post found." });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "No Post found." });
        }
        res.status(500).send("Server error");
    }
});

// @route DELETE api/posts/:post_id
// @desc delete specific post by id (only by post owner) 
// @access Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: "No Post found." });
        }

        //only post owner can delete his post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User is not authorized." });
        }

        await Post.findOneAndRemove(post);

        res.json({ msg: "Post deleted successfully." });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "No Post found." });
        }
        res.status(500).send("Server error");
    }
});

// @route PUT api/posts/like/:post_id
// @desc like a post (update in db)  
// @access Private
router.put("/like/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // check if post had been already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Post already liked." });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error");
    }
});


// @route PUT api/posts/unlike/:post_id
// @desc remove a like form a post (update in db)  
// @access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // check if post had been already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length = 0) {
            return res.status(400).json({ msg: "Post has not yet been liked." });
        }

        // get removelike index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error");
    }
});



// @route POST api/posts/comment/:post_id
// @desc Creating Post comment 
// @access Private
router.post('/comment/:post_id', [auth,
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
        const post = await Post.findById(req.params.post_id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save()

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route DELETE api/posts/:post_id/:comment_id
// @desc Deleting Post comment 
// @access Private
router.delete('/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // pull out comment from post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // make sure comment is exist or not
        if (!comment) {
            return res.status(404).json({ msg: "No comment found." });
        }

        // make sure only owner of comment can delete it
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User is not authorized." });
        }

        // get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;