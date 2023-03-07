import { getUserQuery } from "../../../externalServices/database/entities/userInfoServiceStudentsInfo/query/getUserQuery";
import { Operation } from "../../../externalServices/database/enums/operation";
import { getStatusCode } from "../../shared/service/getStatusCode";

class GetUserService {
    async get(userId: string){
        try {
            const result = await getUserQuery.execute(userId);
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

const getUserService = new GetUserService();
export { getUserService }