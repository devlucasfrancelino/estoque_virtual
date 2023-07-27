import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String},
  username: { type: String },
  password: { type: String },
});

const Users = models.Users || model("Users", userSchema);

export default Users;