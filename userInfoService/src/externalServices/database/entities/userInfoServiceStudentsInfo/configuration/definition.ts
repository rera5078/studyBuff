import Knex from "knex";

export default class UserInfoServiceStudentsInfo {

  static definition(table: Knex.CreateTableBuilder) {
    table.string("CustomerID").notNullable();
    table.primary(["CustomerID"]);
    table.string("Name").notNullable();
    table.string("Email").notNullable();
  }
}
