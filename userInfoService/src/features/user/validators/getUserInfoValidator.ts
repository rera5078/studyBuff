import { commonValidators } from "../../shared/validators/commonValidators";
import { GetUserInfoModel } from "../model/getUserInfoModel";

export class GetUserInfoValidator {
    input: GetUserInfoModel;

    constructor(request: GetUserInfoModel) {
        this.input = request;
    }

    validateCustomerId() {
        if (!commonValidators.checkIsValidASCII(this.input.userId)) {
          throw new Error("[VALIDATION] user ID undefined/ not ASCII");
        }
    
        return this;
      }
}