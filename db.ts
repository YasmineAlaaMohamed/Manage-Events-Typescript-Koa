import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConn = () => {
	const url = process.env.MONGO_URI;
	const options = {
		autoIndex: true,
		serverSelectionTimeOutMS: 5000,
		socketTimeOutMs: 45000,
		family: 4,
	};

	return connect(url, options).then(() => console.log("Connected!"));
};
