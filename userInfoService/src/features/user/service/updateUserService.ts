import { UpdateUserResponseModel } from "../model/updateUserResponseModel";
import { UpdateUserModel } from "../model/updateUserModel";
import { getStatusCode } from "../../shared/service/getStatusCode";
import { Operation } from "../../../externalServices/database/enums/operation";
import updateUserCommand from "../../../externalServices/database/entities/userInfoServiceStudentsInfo/command/updateUserCommand";

class UpdateUserService {
    async update(userId: string, customerInfo: UpdateUserModel) : Promise<UpdateUserResponseModel> {
        try {
            const updateCustomerValues = {
                FirstName: customerInfo.firstName,
                LastName: customerInfo.lastName,
                Email: customerInfo.email,
                Password: customerInfo.password,
            }

            const updateCustomerInfoFor = {
                UserID: userId
            }
            const result = await updateUserCommand.execute(updateCustomerInfoFor, updateCustomerValues);
            customerInfo.userId = userId;
            return {
                data: result,
                status: getStatusCode.operationToStatusCode(Operation.Success)
            };
        } catch (operation: any) {
            return {
                data: undefined,
                status: getStatusCode.operationToStatusCode(operation)
            };
        }
    }
}

const updateUserService = new UpdateUserService();
export { updateUserService  };