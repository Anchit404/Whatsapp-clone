import express from 'express';
import Connection from './database/db.js';
import Route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

// Don't parse multipart/form-data for file upload routes - let multer handle it
app.use('/file/upload', (req, res, next) => next());

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true})) //recognises space
app.use('/', Route);


Connection();
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> console.log(`server is running successfully on port ${PORT}`))