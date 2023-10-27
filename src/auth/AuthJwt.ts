import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { authToken } from "@/envConfig";

passport.use(
  "authJwt",
  new JWTStrategy(
    {
      secretOrKey: authToken.token,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (jwt_payload: string, done): void => done(null, jwt_payload)
  )
);
