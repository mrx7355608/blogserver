import passport from "passport"
import { Strategy } from "passport-local"
import UserData from "./data/user.data";
import { IUser } from "./types/user.types";

const usersDB = UserData();

export default function passportSetup() {
    passport.use(new Strategy(async (username: string, password: string, done: any) => {
        // validate username and password inputs
        // check if admin exists
        // validate password
        // send back admin data
    }))

    passport.serializeUser((user: any, done: any) => {
        return done(null, user.id)
    });
    passport.deserializeUser(async (id: string, done: any) => {
        try {
            const user = await usersDB.findByID(id);
            return done(null, user);
        } catch (err: any) {
            return done(err);
        }
    })
}
