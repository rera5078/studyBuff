import { NextFunction, Request, Response } from "express";
import { UpdateUserModel } from "../model/updateUserModel";
import HttpStatus from "http-status-codes";

import { UpdateUserInfoValidator } from "../validators/updateUserInfoValidator";

class UpdateUserInfoMiddleware{
    public validateRequest(request: Request, response: Response, next: NextFunction) {
        const input: UpdateUserModel = {
          userId: request.params.userId,
          firstName: request.body?.firstName,
          lastName: request.body?.lastName,
          email: request.body?.email,
          password: request.body?.password
        };
    
        try {
          new UpdateUserInfoValidator(input)
          .validateUserId()
          .validateLastName()
          .validateFirstName()
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