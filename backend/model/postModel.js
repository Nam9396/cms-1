import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true, 
    default: 'Test title for your post'
  }, 
  slug: {
    type: String, 
    required: true, 
    default: 'test-title-for-your-post'
  },
  serpTitle: {
    type: String, 
    required: true, 
    default: 'test-title-for-your-post | bacsichobeyeu'
  },
  url: {
    type: String, 
    required: true, 
    default: 'https://bacsichobeyeu.com/test-title-for-your-post'
  },
  featureImg: {
    type: String
  },
  keyword: {
    type: String
  },
  preview: {
    type: String
  },
  description: {
    type: String, 
    required: true, 
    default: 'This is the longggggggg description for your post'
  },
  author: {
    type: String,  
    required: true,
    default: 'Nguyen Thanh Nam'
  },
  datePublish: {
    type: Date, 
    required: true, 
    default: Date.now
  },
  category: {
    type: String, 
    required: true, 
    default: 'Dummy category'
  },
  typeContent: {
    type: String, 
    required: true,
    default: 'Dummy type of content'
  },
  tag: { type: String },
  order: { type: Number, default: 1 },
  content: {
    type: String, 
    required: true,
    default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  modePublish: {
    type: String, 
    required: true, 
    default: 'live'
  },
  modeFetch: {
    type: String,
    required: true, 
    default: 'always'
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;