import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  id: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  creationDate: Date,
  blogsIds: [String],
});
