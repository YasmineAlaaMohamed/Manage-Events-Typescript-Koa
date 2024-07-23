import jwt, { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const pw = process.env.JWT_SECRET;

export const generateToken = (data: object) => {
	const token = sign({ data }, pw, { algorithm: "HS256" });
	return token;
};

export function verifyToken(token: string) {
	return jwt.verify(token, pw);
}
