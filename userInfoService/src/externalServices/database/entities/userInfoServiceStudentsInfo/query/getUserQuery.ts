import UserModelDTO from "../../../models/DTO/userModelDTO";
import { Operation } from "../../../enums/operation";
import db from "../../../dbconnector";
import { Tables } from "../../../constants/tables";

type SelectorModel = { UserID: string; };

export class GetUserQuery {
    async execute(userId: string): Promise<UserModelDTO> {

        let dbResponse;
        try {
            const query: SelectorModel = { UserID: userId}
            dbResponse = await this.query(query)
        } catch (error) {
            console.error("[DB] fetch user failed", { inputdata: { userId:  userId }, error: error });
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            return new UserModelDTO(dbResponse[0]);
        }
        console.log("[DB] Non-existent customer", { userId:  userId});
        throw Operation.AlreadyExists;
    }

    private query(selector: SelectorModel) {
        const query = db.dbConnector
            .from(Tables.TABLE_CUSTOMERS)
            .where(selector);
            
        return query.then((response: any) => response);
    }
}

const getUserQuery = new GetUserQuery();
export { getUserQuery }