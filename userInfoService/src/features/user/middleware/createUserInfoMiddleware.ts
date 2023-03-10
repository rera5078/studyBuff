import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { CreateUserModel } from "../model/createUserModel";
import { CreateUserValidator } from "../validators/createUserValidator";

class CreateUserInfoMiddleware {

  public validateRequest(request: Request, response: Response, next: NextFunction) {
    const input: CreateUserModel = {
      userId: request.body.email,
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    try {
      new CreateUserValidator(input)
        .validateUserId()
        .validateName()
        .validateEmail()
        .validatePassword()

    } catch (err) {
      console.log(err);
      response.status(HttpStatus.BAD_REQUEST);
      response.send(err);
      return;
    }

    next();
  }
}

const createUserInfoMiddleware = new CreateUserInfoMiddleware();
export { createUserInfoMiddleware };