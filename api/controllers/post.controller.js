const Post = require("../models/post.model");
const User = require("../models/user.model");

//create a post

exports.create = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).send(savedPost);
  } catch (err) {
    res.status(501).send(err);
  }
};


//update a post

exports.update=  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated.");
    } else {
      res.status(403).json("you can update only your post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

//delete a post

exports.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

//like / dislike a post

exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

//get a post

exports.get = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts

exports.timeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    console.log(userPosts);
    console.log(currentUser);
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        console.log(friendId);
        return Post.find({ userId: friendId });
      })
      );
      
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
};
