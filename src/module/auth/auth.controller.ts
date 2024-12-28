import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const register = catchAsync(async(req: Request, res: Response)=>{
    const result = await AuthService.register(req.body);

    sendResponse(res,{
        statusCode: StatusCodes.CREATED,
        status: true,
        message: "User registered successfully",
        data: result
    })
})
const login = catchAsync(async(req: Request, res: Response)=>{
    const result = await AuthService.login(req.body);

    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        status: true,
        message: "User logged in successfully",
        token: result?.token,
        data: result?.user
    })
})

const forgetPassword = catchAsync(async(req:Request, res: Response)=>{
    const result = await AuthService.forgetPassword(req.body);

    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        status: true,
        message: "Password reset link sent to your email",
        data: result
    })
})

const resetPassword = catchAsync(async(req:Request, res: Response)=>{
    const result = await AuthService.resetPassword(req.body);

    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        status: true,
        message: "password reset successfully",
        data: result
    })
})




export const AuthControllers = {
    register,
    login,
    forgetPassword,
    resetPassword
}