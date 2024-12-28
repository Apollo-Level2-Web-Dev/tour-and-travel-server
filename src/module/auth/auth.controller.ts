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




export const AuthControllers = {
    register,
    login
}