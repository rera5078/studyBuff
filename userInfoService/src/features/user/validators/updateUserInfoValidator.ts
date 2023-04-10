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