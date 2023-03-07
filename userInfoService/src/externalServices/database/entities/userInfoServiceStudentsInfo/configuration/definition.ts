import Knex from "knex";

export default class UserInfoServiceStudentsInfo {

  static definition(table: Knex.CreateTableBuilder) {
    table.string("UserID").notNullable();
    table.primary(["UserID"]);
    table.string("Name").notNullable();
    table.string("Email").notNullable();
  }
}
