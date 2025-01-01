import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStartegy} from "passport-google-oauth20";
import UserSchema from "../user/user.schema";
import tokens from "../utilsuses/create.tokens";
dotenv.config();
passport.use(
    new GoogleStartegy({
        clientID: process.env.clientID!,
        clientSecret: process.env.clientSecret!,
        callbackURL: process.env.callbackURL!
    }, async (accessToken, refreshToken, profile, done) => {
        
        try {
            let user = await UserSchema.findOne({googlId: profile.id});
            if (!user) {
                let checkUser = await UserSchema.findOne({email: profile._json.email});
                if (checkUser) {
                    if ((!checkUser.image || checkUser.image.split('/').pop() === 'user-Avatar-Profile-PNG-Images.png') && profile._json.picture) checkUser.image = profile._json.picture
                    else checkUser.image = checkUser.image.split(`${process.env.BASE_URL}/images/user/`)[1]
                    checkUser.googlId = profile.id;
                    await checkUser.save({validateModifiedOnly: true});
                } else {
                    checkUser = await UserSchema.create({
                        name: profile._json.name,
                        email: profile._json.email,
                        image: profile._json.picture,
                        hasPassword: false,
                        googlId: profile.id
                    });
                }
                user = checkUser;
            }
            const token = tokens.accessToken(user?._id, user?.role!)
            
            done(null, {token});
        } catch (err) {
            done(err, false)
        }
    })
)