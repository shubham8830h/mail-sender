const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    comments: [{
      type: ObjectId,
      ref:'comment'
    }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("post", postSchema);
