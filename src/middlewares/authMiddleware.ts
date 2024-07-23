import { Context, Next } from "koa";
import jwt from "jsonwebtoken";

export async function authenticate(ctx: Context, next: Next) {
	const token = ctx.request.headers.authorization?.split(" ")[1];
	if (!token) {
		ctx.throw(401, "Unauthorized");
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		ctx.state.user = decoded;
	} catch (error) {
		ctx.throw(401, "Invalid token");
	}
	await next();
}
