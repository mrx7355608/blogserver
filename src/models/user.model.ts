import mongoose from "mongoose";
import { IUser } from "../types/user.types"

const userSchema = new mongoose.Schema<IUser>({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
