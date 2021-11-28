import { Schema } from 'mongoose';

export const BlogSchema = new Schema({
  title: String,
  text: String,
  creationDate: Date,
  creatorId: String,
});
