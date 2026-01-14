import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import User from "../models/User.js";

/* =========================
   LOAD .env EXPLICITLY
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 THIS IS THE CRITICAL FIX
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// 🔍 DEBUG (KEEP TEMPORARILY)
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("GITHUB_CLIENT_ID =", process.env.GITHUB_CLIENT_ID);

/* =========================
   GOOGLE STRATEGY
========================= */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email,
                        avatar: profile.photos[0].value,
                        provider: "google",
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

/* =========================
   GITHUB STRATEGY
========================= */
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email =
                    profile.emails && profile.emails.length > 0
                        ? profile.emails[0].value
                        : `${profile.username}@github.com`;

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName || profile.username,
                        email,
                        avatar: profile.photos[0].value,
                        provider: "github",
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);
