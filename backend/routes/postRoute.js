import express from "express";
import { addManyPosts, createPost, deletePostBySlug, editPostBySlug, getAllPost, getPostBySlug, getPostBySlugForEdit, getPostSlug } from "../controller/postController.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

const postRoute = express.Router();

// create post
postRoute.route('/').post(createPost)
// get all post
postRoute.route('/all').get(getAllPost)
// get post slug for path creating
postRoute.route('/slug').get(getPostSlug)
// get post by slug
postRoute.route('/:slug').get(getPostBySlug)
// get post by slug for edit
postRoute.route('/edit/:slug').get(getPostBySlugForEdit)
// update post by slug
postRoute.route('/edit/:postSlug').put(editPostBySlug)
// delete post by id
postRoute.route('/:slug').delete(deletePostBySlug)
// upload post in docx
postRoute.route('/add-post').post(addManyPosts)


export default postRoute; 