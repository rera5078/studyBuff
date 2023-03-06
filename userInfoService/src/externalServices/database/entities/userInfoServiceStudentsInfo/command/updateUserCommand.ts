import { UpdateUserModel } from "../../../models/DAO/updateUserModel";
import UserModelDTO from "../../../models/DTO/userModelDTO";
import { Operation } from "../../../enums/operation";
import db from "../../../dbconnector";
import { Tables } from "../../../constants/tables";


export class UpdateUserCommand {

    async execute(selector: UpdateWhereClauseModel, updateRequest: UpdateUserModel): Promise<UserModelDTO> {

        let dbResponse;
        try {
            dbResponse = await this.query(updateRequest, selector);
        } catch (error) {
            console.error("[DB] update user failed", { inputdata: updateRequest, error: error });
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            return new UserModelDTO(dbResponse[0]);
        }

        console.log("[DB] Non-existent customer", { inputData: { updateRequest, for: selector } });
        throw Operation.ObjectDoesNotExists;
    }

    private async query(
        updateRequest: UpdateUserModel,
        selector: UpdateWhereClauseModel,
      ) {

        const query = db.dbConnector.update(updateRequest)
          .into(Tables.TABLE_CUSTOMERS)
          .where(selector)
          .returning("*");

        return query.then((response: any) => response);
      }
}

const updateUserCommand = new UpdateUserCommand();
export default updateUserCommand;