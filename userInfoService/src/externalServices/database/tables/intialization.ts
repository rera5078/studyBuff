import { Tables } from "../constants/tables";
import UserInfoServiceStudentsInfo from "../entities/userInfoServiceStudentsInfo/configuration/definition";
import { createTable } from "./createTable";


export class TableInitializer {

  static async init() {
    await createTable.create(Tables.TABLE_CUSTOMERS, UserInfoServiceStudentsInfo.definition);
  }
}
