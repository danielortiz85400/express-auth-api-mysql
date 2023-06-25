import { Router } from "express";
import { auth } from "../middelwares/MwAuth";
import { SchemasValidator } from "@/validations/SchemaManager";
import { signinSchema } from "@/validations/ValSignin";
import { signupSchema } from "@/validations/ValSignup";
export const router = Router();

router.post("/signin", [auth("authJwt"), SchemasValidator(signinSchema), auth("signin") ]);

router.post("/signup", [SchemasValidator(signupSchema), auth("signup")]);
