import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { UserValidation } from "../user/userValidation";

const authRouter = Router();

authRouter.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);
authRouter.post("/forget-password", validateRequest(AuthValidation.forgetPasswordValidationSchema) ,AuthControllers.forgetPassword)
authRouter.post("/reset-password" ,AuthControllers.resetPassword)



export default authRouter;