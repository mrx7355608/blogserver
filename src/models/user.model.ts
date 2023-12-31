import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/user.types";

const userSchema = new mongoose.Schema<IUser>({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
});

// Pre middleware for hashing password
userSchema.pre("save", async function (next) {
    if (this.isNew) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        return next();
    }
    return next();
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
