import { commonValidators } from "../../shared/validators/commonValidators";
import { CheckUserAuthorizationModel } from "../model/checkUserAuthorizationModel";

export class CheckUserAuthorizationValidator {
    input: CheckUserAuthorizationModel;

    constructor(request: CheckUserAuthorizationModel) {
        this.input = request;
    }

    validateUserId() {
        if (!commonValidators.checkIsValidASCII(this.input.userId)) {
          throw new Error("[VALIDATION] customer ID undefined/ not ASCII");
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