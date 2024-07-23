import { Schema, model, Document } from "mongoose";

export interface ITag extends Document {
	name?: string;
}

const tagSchema = new Schema({
	name: { type: String, required: true },
});

export const TagModel = model<ITag>("Tag", tagSchema);
