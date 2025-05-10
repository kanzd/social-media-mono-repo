import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import CommentRoute from "./Routes/CommentRoute.js";
// Routes
const app = express();


// to serve images for public (public folder)
app.use(express.static('public'));
app.use('/images', express.static('images'));


// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();


const connection = process.env.MONGO_URI || 'mongodb://localhost:27017/hik8';
mongoose.connect
    (connection, { useNewUrlParser: true, useUnifiedTopology: true,dbName: "hik8", }
    ).then(() =>
        app.listen(4000, () => console.log(`listening at ${4000}`))
    ).catch((error) =>
        console.log(error)
    )


// uses of routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/comment', CommentRoute);