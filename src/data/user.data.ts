import UserModel from "../models/user.model";
import { IUser } from "../types/user.types";

export default function UserData() {
    async function findByID(id: string): Promise<IUser | null> {
        const user = await UserModel.findById(id).lean();
        return user;
    }

    async function findByUsername(username: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ username });
        return user;
    }

    return { findByID, findByUsername };
}
