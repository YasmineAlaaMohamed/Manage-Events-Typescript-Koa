import { Context } from "koa";
import { UserModel, CommentModel } from "../Models";

type commentInput = {
	content: string;
	userId: string;
	eventId: string;
};

export const saveComment = async (ctx: Context) => {
	const userId = await UserModel.findById(ctx.state.user.userId);
	const { content, eventId } = ctx.request.body as commentInput;

	let comment = new CommentModel({
		content,
		userId,
		eventId,
	});

	try {
		await comment.save();
		ctx.body = { message: `created successfully!` };
		ctx.status = 201;
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

export const updateComment = async (ctx: Context) => {
	//TODO: check permissions

	try {
		const commentId = ctx.params.id;
		const requestEventData: any = ctx.request.body;

		//Prepare request To avoid saving direct data from user
		const comment = await CommentModel.findByIdAndUpdate(
			commentId,
			requestEventData
		);
		ctx.body = { message: `${comment._id} successfully updated!` };
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

export const deleteComment = async (ctx: Context) => {
	try {
		const commentId = ctx.params.id;
		if (!commentId) {
			ctx.status = 404;
			ctx.body = { error: "Record doesn't exist" };
		} else {
			await CommentModel.findByIdAndDelete(commentId);
			ctx.body = { message: `successfully deleted!`, records: commentId };
			ctx.status = 200;
		}
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};
