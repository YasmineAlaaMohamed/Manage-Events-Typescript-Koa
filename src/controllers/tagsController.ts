import { Context } from "koa";
import { TagModel } from "../Models";

type tagInput = [];

export const createTags = async (ctx: Context) => {
	//TODO: check permissions
	//TODO Request Validation
	try {
		const requestTagData = ctx.request.body as tagInput;
		requestTagData.forEach(async (name) => {
			const tagExist = await TagModel.findOne({ name });
			if (!tagExist) {
				await TagModel.create({ name });
			}
		});
		ctx.body = {
			message: ` successfully created!`,
			records: [],
		};
		ctx.status = 201;
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

export const getTags = async (ctx: Context) => {
	const tags = await TagModel.find();
	ctx.body = { message: `fetched successfully!`, records: tags };
};
