import { Context } from "koa";
import { UserModel } from "../Models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/Auth/create-token";
import { encrypt } from "../utils/secure-data";

type userInput = {
	email: string;
	password: string;
};

type userFormInput = {
	name: string;
	email: string;
	password: string;
};

type JwtPayload = {
	userId: string;
};

export const login = async (ctx: Context) => {
	const { email, password } = ctx.request.body as userInput;

	const user = await UserModel.findOne({ email });
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!user || !passwordMatch) {
		ctx.status = 401;
		ctx.body = { message: "Invalid credentials" };
		return;
	}

	ctx.status = 200;
	if (user) {
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			algorithm: "HS256",
		});
		ctx.body = { token };
	} else {
		ctx.status = 401;
		ctx.body = { message: "Invalid credentials" };
	}
};

export const register = async (ctx: Context) => {
	const { name, email, password } = ctx.request.body as userFormInput;
	if (!name) {
		ctx.throw(400, {
			message: "please enter name!",
		});
	}
	const existingUser = await UserModel.findOne({ email });

	if (existingUser) {
		ctx.status = 400;
		ctx.body = { message: "User already exists" };
		return;
	}

	const user = await UserModel.create({
		name,
		email,
		password: await encrypt(password),
	});

	const token = generateToken(user);
	ctx.status = 201;
	ctx.body = { message: "User registered successfully", token: token };
};

export const getAuthUser = async (ctx: Context) => {
	const { token } = ctx.params;
	const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
	const user = await UserModel.findById(decoded?.userId);
	ctx.body = user;
};
