const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: ObjectId,
        ref: "comment",
      },
    ],

    auther: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
