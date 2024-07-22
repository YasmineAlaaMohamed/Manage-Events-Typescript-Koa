import mongoose, { Schema, model, Document } from 'mongoose'; 

export interface IComment extends Document { 
    content: string; 
    userId: string; 
    eventId: string; 
} 
const CommentSchema: Schema = new Schema({ 
    content: { type: String, required: true }, 
    userId: { type: Schema.Types.ObjectId, 
    ref: 'User', required: true }, 
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true } 
}, {
    timestamps: true
  }); 

export const CommentModel = model<IComment>('Comment', CommentSchema);
