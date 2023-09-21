import express, { urlencoded } from "express";
import path from 'path'
import dotenv from 'dotenv'; dotenv.config();
import cors from 'cors';
import connectDB from "./config/mongoClient.js";
import postRoute from "./routes/postRoute.js";
import customError from "./utils/customError.js";

import multer from 'multer';
import mammoth from "mammoth";
import TurndownService from "turndown";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});


const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(cors())
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/post', postRoute)
app.post('/api/post/upload', upload.single('docx'), async (req, res) => {
  try {
    const { buffer } = req.file;
    const { value } = await mammoth.convertToHtml({ buffer });
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(value);
    res.json(markdownContent)
  } catch (error) {
    console.error('Error converting file:', error);
    res.status(500).json({ success: false, message: 'Conversion failed' });
  }
})

if (process.env.NODE_ENV === 'production') { 
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.use('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
} else { 
  app.get('/', (req, res, next) => {
    res.send('API is running...');
  })
}

app.use(customError)


app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)    
});