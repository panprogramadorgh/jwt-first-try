import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

const UserModel = mongoose.models.User ?? model("User", userSchema, "users");

export default UserModel;
