import { Context } from "koa";
import { EventModel, TagModel, CommentModel } from "../Models";
import moment from "moment";

type eventInput = {
	title: string;
	description: string;
	location: string;
	organizer: string;
	time: string;
	date: Date;
	tags: [];
};

export const getEvents = async (ctx: Context) => {
	//TODO: check permissions
	//TODO Request Validation
	try {
		const { params, tag } = ctx.request.query;
		let searchParams: any = {};
		let tagParams: any = {};

		if (tag && tag.length > 0) {
			const tagObjects = await TagModel.find({
				name: { $in: tag },
			});
			tagParams = { tags: { $in: tagObjects } };
		}
		if (params) {
			searchParams = {
				$and: [
					{
						$or: [
							{ title: { $regex: ".*" + params + ".*" } },
							{ description: { $regex: ".*" + params + ".*" } },
						],
					},
					tagParams,
				],
			};
		} else {
			searchParams = tagParams;
		}

		//TODO: Apply Pagination
		const events = await EventModel.find(searchParams)
			.populate("tags")
			.populate("comments")
			.exec();
		ctx.body = { message: `fetched successfully!`, records: events };
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

export const createEvent = async (ctx: Context) => {
	//TODO: check permissions

	try {
		const requestEventData = ctx.request.body as eventInput;
		createTagsIfNotExist(requestEventData.tags);
		const tagObjects = await TagModel.find({
			name: { $in: requestEventData.tags },
		});
		//Prepare request To avoid saving direct data from user
		const saveData = prepareRequest(requestEventData, tagObjects);
		const event = new EventModel(saveData);
		await event.save();
		ctx.body = {
			message: `${saveData.title} successfully created!`,
			records: event,
		};
		ctx.status = 201;
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

export const updateEvent = async (ctx: Context) => {
	//TODO: check permissions

	try {
		const eventId = ctx.params.id;
		const requestEventData: any = ctx.request.body as eventInput;

		createTagsIfNotExist(requestEventData.tags);
		const tagObjects = await TagModel.find({
			name: { $in: requestEventData.tags },
		});
		//Prepare request To avoid saving direct data from user
		const saveData = prepareRequest(requestEventData, tagObjects);
		const event = await EventModel.findByIdAndUpdate(eventId, saveData);
		ctx.body = { message: `${saveData.title} successfully updated!` };
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

export const deleteEvent = async (ctx: Context) => {
	//TODO: check permissions
	try {
		const eventId = ctx.params.id;
		const event = await EventModel.findById(eventId);
		if (!event) {
			ctx.status = 404;
			ctx.body = { error: "Record doesn't exist" };
		} else {
			await EventModel.findByIdAndDelete(eventId);
			ctx.body = { message: `successfully deleted!`, records: eventId };
			ctx.status = 200;
		}
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

export const viewEvent = async (ctx: Context) => {
	//TODO: check permissions
	try {
		const eventId = ctx.params.id;
		const event = await EventModel.findById(eventId);
		const comments = await CommentModel.find({ eventId: eventId }).populate(
			"userId"
		);
		event.comments = comments;
		ctx.body = { message: `fetched successfully!`, records: event };
	} catch (err) {
		ctx.status = 400;
		ctx.body = { error: err.message };
	}
};

const prepareRequest = (requestEventData: any, tagObjects: any) => {
	return {
		title: requestEventData.title,
		description: requestEventData.description,
		location: requestEventData.location,
		organizer: requestEventData.organizer,
		time: requestEventData.time,
		date: requestEventData.date,
		tags: tagObjects,
	};
};

const createTagsIfNotExist = (tags: []) => {
	tags.forEach(async (name) => {
		const tagExist = await TagModel.findOne({ name });
		if (!tagExist) {
			await TagModel.create({ name });
		}
	});
};
