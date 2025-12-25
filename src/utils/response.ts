import { Response } from "express";

export const response = (res: Response, status: number, success: boolean, message?: string, data?: any) =>{

   return res.status(status).json({
        success: success,
        message: message,
        data: data
    });
}