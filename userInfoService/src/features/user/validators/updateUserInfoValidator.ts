import { commonValidators } from "../../shared/validators/commonValidators";
import { UpdateUserModel } from "../model/updateUserModel";

export class UpdateUserInfoValidator {
  input: UpdateUserModel;

  constructor(request: UpdateUserModel) {
    this.input = request;
  }

  validateUserId() {
    if (!commonValidators.checkIsValidASCII(this.input.userId)) {
      throw new Error("[VALIDATION] Customer ID undefined/ not ASCII");
    }

    return this;
  }

  validateName() {

    if (this.input.name != undefined && !commonValidators.checkIsValidASCII(this.input.name)) {
      throw new Error("[VALIDATION] name undefined/ not ASCII");
    }

    return this;
  }

  validateEmail() {

    if (this.input.email != undefined && !commonValidators.checkIsValidASCII(this.input.email)) {
      throw new Error("[VALIDATION] email undefined/ not ASCII");
    }

    return this;
  }

  validatePassword() {

    if (this.input.password != undefined &&  !commonValidators.checkIsValidASCII(this.input.password)) {
      throw new Error("[VALIDATION] password undefined/ not ASCII");
    }

    return this;
  }
}