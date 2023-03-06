import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { CheckUserAuthorizationModel } from "../model/checkUserAuthorizationModel";
import { CheckUserAuthorizationValidator } from "../validators/checkUserAuthorizationValidator";

class CheckAuthorizationMiddleware{
    
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: CheckUserAuthorizationModel = {
          userId: request.params.userId,
          password: request.query.password as string
        };
    
        try {
          new CheckUserAuthorizationValidator(input)
            .validateUserId()
            .validatePassword()
    
        } catch  (err) {
          console.log(err);
          response.status(HttpStatus.BAD_REQUEST);
          response.send(err);
          return;
        }

        next();
      }
}

const checkAuthorizationMiddleware = new CheckAuthorizationMiddleware();
export { checkAuthorizationMiddleware };