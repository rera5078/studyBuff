import { commonValidators } from "../../shared/validators/commonValidators";
import { CreateUserModel } from "../model/createUserModel";

export class CreateUserValidator {
  input: CreateUserModel;

  constructor(request: CreateUserModel) {
    this.input = request;
  }

  validateUserId() {
    if (!commonValidators.checkIsValidASCII(this.input.userId)) {
      throw new Error("[VALIDATION] customer ID undefined/ not ASCII");
    }

    return this;
  }

  validateName() {
    if (!commonValidators.checkIsValidASCII(this.input.name)) {
      throw new Error("[VALIDATION] customer ID undefined/ not ASCII");
    }

    return this;
  }

  validateEmail() {
    if (!commonValidators.checkIsValidASCII(this.input.email)) {
      throw new Error("[VALIDATION] email undefined/ not ASCII");
    }

    return this;
  }

  validatePassword() {
    if (!commonValidators.checkIsValidASCII(this.input.password)) {
      throw new Error("[VALIDATION] password undefined/ not ASCII");
    }

    return this;
  }

}