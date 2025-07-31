import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  api_key:{
    type: String,
    unique: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  avatar: {
    type: String,
    // type: Buffer,
  },
});

const User = new model("user", userSchema);
export default User;
