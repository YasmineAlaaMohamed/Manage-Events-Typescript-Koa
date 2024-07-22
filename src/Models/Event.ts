import { Schema, model, Document } from "mongoose";
import { ITag } from "./Tag";
import { IComment } from "./Comment";

export interface IEvent extends Document {
	title: string;
	description: string;
	organizer: string;
	Date: Date;
	Time: string;
	location?: string;
	comments?: IComment[];
	tags?: ITag[];
}

const eventSchema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		organizer: { type: String, required: true },
		location: { type: String, required: true },
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
		date: { type: Date, required: true },
		time: { type: String, required: true },
		comments: [
			{ type: Schema.Types.ObjectId, ref: "Comment" },
			{ type: Schema.Types.ObjectId, ref: "User" },
		],
	},
	{
		timestamps: true,
	}
);

export const EventModel = model<IEvent>("Event", eventSchema);
