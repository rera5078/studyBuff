import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { GetUserInfoModel } from "../model/getUserInfoModel";
import { GetUserInfoValidator } from "../validators/getUserInfoValidator";

class GetUserInfoMiddleware{
    
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: GetUserInfoModel = {
          userId: request.params.userId
        };
    
        try {
          new GetUserInfoValidator(input)
            .validateCustomerId()
    
        } catch  (err) {
          console.log(err);
          response.status(HttpStatus.BAD_REQUEST);
          response.send(err);
          return;
        }

        next();
      }
}

const getUserInfoMiddleware = new GetUserInfoMiddleware();
export { getUserInfoMiddleware };