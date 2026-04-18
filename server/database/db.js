import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection =  async() => {
    const URL = process.env.MONGO_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-clone.1mog1mz.mongodb.net/?retryWrites=true&w=majority&appName=Whatsapp-clone`
    try {
       await  mongoose.connect(URL);
       console.log('Database connected')
    } catch (error) {
        console.log('Error while connecting with database', error.message);
    }

}

export default  Connection;