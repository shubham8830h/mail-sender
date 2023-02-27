const postmodel = require("../model/postmodel");
const commentmodel=require("../model/commentmodel")


const createPost = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).send({ message: "not data given in body" });
    }
    const createpost = await postmodel.create(req.body);
    if (!createpost) {
      return res.status(400).send({ message: "post is not created" });
    }

    res.status(201).send({
      status: true,
      message: "post is succesfull created",
      data: createpost,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPostid = async (req, res) => {
  try {
    const get=req.params.postid
    const getpost = await postmodel.findById(get).populate('comments');
    if (!getpost) {
      return res.status(400).send({ message: "no post in database" });
    }
    res.status(200).send({
      status: true,
      data: getpost,
    });
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    const postId = req.params.postid;
    let updateData = req.body;
    console.log(postId);
    // let checkId = await blogsModel.findOne({ _id: postId });

    const editpost = await postmodel.findByIdAndUpdate(
      {
        _id: postId,
      },
      { $set: { title: updateData.title, content: updateData.content } },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "post is edit successful...",
      status: true,
      data: editpost,
    });
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postid;
    
    const deletepost = await postmodel.findByIdAndDelete({
      _id: postId,
    });
    res.status(200).send({
      message: "post is delete successful...",
      status: true,
      data: deletepost,
    });
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
};

module.exports = { createPost, getPostid, editPost, deletePost };
