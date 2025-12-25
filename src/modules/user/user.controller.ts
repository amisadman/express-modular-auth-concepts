import { Request, Response } from "express";
import { userService } from "./user.service";
import { response } from "../../utils/response";

const getAllUsers = async(req: Request, res: Response) => {
    
    try {
        const result = await userService.getAllUser();
        console.log(result);
        return response(res, 200, true,"User Fetched Successfully", result.rows)
        
    } catch (error: any) {

        return response(res,500,false, error.message, null )
        
    }
}
const createUser = async(req: Request, res: Response) =>{

    try {

        const result = await userService.createUser(req.body);
        console.log(result);
        return response(res,201,true, "User created Successfully", result.rows[0]);
        
    } catch (error: any) {

        return response(res,500,false, error.message, null );
        
    }
}

export const userController ={
    getAllUsers,createUser
}