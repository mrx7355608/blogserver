import passport from "passport";
import { Strategy } from "passport-local";
import UserData from "./data/user.data";
import bcrypt from "bcryptjs";
import loginDataValidator from "./validators/auth.validator";

const usersDB = UserData();

export default function passportSetup() {
    passport.use(
        // eslint-disable-next-line
        new Strategy(async (username: string, password: string, done: any) => {
            // validate username and password inputs
            const errorMessage = loginDataValidator({ username, password });
            if (errorMessage) {
                return done(null, false, { message: errorMessage });
            }

            // check if admin exists
            const admin = await usersDB.findByUsername(username);
            if (admin === null) {
                return done(null, false, {
                    message: "Incorrect username or password",
                });
            }

            // validate password
            const isValidPassword = await bcrypt.compare(
                password,
                admin.password,
            );
            if (isValidPassword === false) {
                return done(null, false, {
                    message: "Incorrect username or password",
                });
            }

            // send back admin data
            return done(admin);
        }),
    );

    passport.serializeUser((user: any, done: any) => {
        return done(null, user.id);
    });
    passport.deserializeUser(async (id: string, done: any) => {
        try {
            const user = await usersDB.findByID(id);
            return done(null, user);
        } catch (err: any) {
            return done(err);
        }
    });
}
