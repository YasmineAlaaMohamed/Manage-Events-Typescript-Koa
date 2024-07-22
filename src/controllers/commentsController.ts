import { Context } from "koa";
import { EventModel, IEvent, TagModel, ITag } from "../Models";
import Tag from "../Models/Tag";

type eventInput = {
	title: string;
	description: string;
	tags: [];
};

export const createComment = async (ctx: Context) => {
	const { title, description, tags } = ctx.request.body as eventInput;
	const { eventId } = ctx.params;

	// ctx.status = 201;
};
