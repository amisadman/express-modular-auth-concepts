import { Request, Response } from "express";
import { response } from "../../utils/response";
import { authService } from "./auth.service";

const login = async(req: Request, res: Response)=>{
    
    
    try {
        const result = await authService.login(req.body);
        console.log(result);

        if(result === false)return response(res,500,false, "wrong password", null );
        else if(result === null)return response(res,500,false, "user not found", null );
        else return response(res, 200, true,"User login Successfully", result);


    } catch (error: any) {

        return response(res,500,false, error.message, null );
    }
}

export const authController={
    login
}