import {connect} from 'mongoose';
import dotenv from "dotenv";

dotenv.config()

export const dbConn = () => {
    const url = 'mongodb://127.0.0.1:27017/schooldb';
    const options = {
        autoIndex: true,
        serverSelectionTimeOutMS:5000,
        socketTimeOutMs:45000,
        family:4
    }


    return connect(url, options)
  .then(() => console.log('Connected!'));

  


}
