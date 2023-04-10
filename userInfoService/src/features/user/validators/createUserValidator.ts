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

  validateFirstName() {
    if (!commonValidators.checkIsValidASCII(this.input.firstName)) {
      throw new Error("[VALIDATION] First Name undefined/ not ASCII");
    }

    return this;
  }

  validateLastName() {
    if (!commonValidators.checkIsValidASCII(this.input.lastName)) {
      throw new Error("[VALIDATION] Last Name undefined/ not ASCII");
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