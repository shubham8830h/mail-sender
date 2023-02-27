// const { model } = require("mongoose");
const commentmodel = require("../model/commentmodel");
const postmodel = require("../model/postmodel");

const createComment = async (req, res) => {
  try {
    const blogid = req.params.postid;
    const commentData = req.body;

    const post = await postmodel.findById(blogid);
    if (!post) {
      res.status(400).send({ message: "enter the valid id " });
    }
    const comment = new commentmodel({
      content: commentData.content,
      author: commentData.author,
    });
    await comment.save();
    post.comments.push(comment);
    await post.save();
    res.send(comment);
  } catch (error) {
    console.log(error.message);
  }
};

const CommentonComment = async (req, res) => {
  try {
    const commentid = req.params.commentid;
    const commentData = req.body;

    const previousComment = await commentmodel.findById(commentid);
    if (!previousComment) {
      res.status(400).send({ message: "enter the valid id " });
    }
    const comment = new commentmodel({
      content: commentData.content,
    });
    await comment.save();
    previousComment.comments.push(comment);
    await previousComment.save();
    res.send(comment);
  } catch (error) {
    console.log(error.message);
  }
};

const updateComment = async (req, res) => {
  try {
    const commentid = req.params.commentid;
    const data = req.body;

    const postfind = await commentmodel.findByIdAndUpdate(
      {
        _id: commentid,
      },
      {
        $set: { content: data.content },
      },
      {
        new: true,
      }
    );
    if (!postfind) {
      return res.status(404).send({ message: "comment is not found" });
    }
    res.status(200).send({ message: "successful update....", data: postfind });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentid = req.params.commentid;
    const previousComment = await commentmodel.findByIdAndDelete(commentid);
    if (!previousComment) {
      res.status(400).send({ message: "enter the valid id " });
    }

    res.status(200).send({ message: "the comment is deleted succefully" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  createComment,
  updateComment,
  CommentonComment,
  deleteComment,
};
