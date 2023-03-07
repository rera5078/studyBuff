import { NextFunction, Request, Response } from "express";
import { UpdateUserModel } from "../model/updateUserModel";
import HttpStatus from "http-status-codes";

import { UpdateUserInfoValidator } from "../validators/updateUserInfoValidator";

class UpdateUserInfoMiddleware{
    public validateRequest(request: Request, response: Response, next: NextFunction) {
      console.log(request.params)
      console.log(request.body)
        const input: UpdateUserModel = {
          userId: request.params.userId,
          name: request.body?.name,
          email: request.body?.email,
          password: request.body?.password
        };
    
        try {
          new UpdateUserInfoValidator(input)
          .validateUserId()
          .validateName()
          .validateEmail()
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

const updateUserInfoMiddleware = new UpdateUserInfoMiddleware();
export { updateUserInfoMiddleware };