
import { getUserQuery } from "../../../externalServices/database/entities/userInfoServiceStudentsInfo/query/getUserQuery";
import { Operation } from "../../../externalServices/database/enums/operation";
import { getStatusCode } from "../../shared/service/getStatusCode";

class CheckAuthorizationService {
    async getCustomerInfoIfAuthorized(userId: string, password: string){
        try {
            const result = await getUserQuery.execute(userId);
            if (result.password === password){
                return {
                    data: result,
                    status: getStatusCode.operationToStatusCode(Operation.Success)
                };
            }
            return {
                data: undefined,
                status: getStatusCode.operationToStatusCode(Operation.Error)
            };
        } catch (operation: any) {
            return {
                data: undefined,
                status: getStatusCode.operationToStatusCode(operation)
            };
        }
    }
}

const checkAuthorizationService = new CheckAuthorizationService();
export { checkAuthorizationService }