import { Router } from "express";
import { auth } from "../middelwares/MwAuth";
import { SchemasValidator } from "@/validations/SchemaManager";
import { signinSchema } from "@/validations/SchSignin";
import { signupSchema } from "@/validations/SchSignup";


export const router = Router();

router.get("/renewalToken", auth("cookie")) 

router.post("/signin", [SchemasValidator(signinSchema), auth("signin") ]); 

router.post("/signup", [auth("authJwt"), SchemasValidator(signupSchema), auth("signup")]);//

