const express=require('express')
const router=express.Router()
const postController=require('../controller/post')
const commentController=require('../controller/comment')

//post routes
router.post('/createpost',postController.createPost)
router.get("/post/:postid", postController.getPostid);
router.put("/edit/:postid", postController.editPost);
router.delete("/delete/:postid", postController.deletePost);

//comment routes
router.post("/posts/:postid/comment", commentController.createComment);
router.put("/comment/:commentid", commentController.updateComment);
router.put("/comment/:commentid/comment", commentController.CommentonComment);
router.delete("/comment/:commentid",commentController.deleteComment)


module.exports={router}