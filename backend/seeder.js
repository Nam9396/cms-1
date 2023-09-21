import mongoose from "mongoose";
import color  from "colors";
import dotenv from 'dotenv';
dotenv.config();
import Post from "./model/postModel.js";
import connectDB from "./config/mongoClient.js";

connectDB();

const importData = async() => {
  return;
}

const destroyData = async() => {
  try { 
    await Post.deleteMany();
    
    console.log('Data destroyed'.red.inverse)
    process.exit();
  } catch (error) { 
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }   
}

if (process.argv[2] === '-d') { 
  destroyData();
} else { 
  importData();
}
