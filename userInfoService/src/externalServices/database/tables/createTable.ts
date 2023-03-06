import Knex, { CreateTableBuilder } from "knex";
import { environmentVariables } from "../../../configurations/environmentVariables";
import db from "../dbconnector";

class CreateTable {

  private readonly dbConnector: Knex = db.dbConnector;

  public async create(tableName: string, tableConfiguration: (builder: CreateTableBuilder) => void) {
    // only first instances setup db
    if (environmentVariables.INSTANCE_INDEX !== undefined && environmentVariables.INSTANCE_INDEX !== "0") {
      return;
    }

    try {
      if (!(this.dbConnector && this.dbConnector.schema)) {
        return;
      }

      const tableExists = await this.checkIfTableExists(tableName);
      if (!tableExists) {
        await this.dbConnector.schema
          .createTable(tableName, tableConfiguration)
          .then(result => result);
        console.log(`[DB] table created  ${tableName}`);
      }
    }
    catch (error) {
      console.error(`[DB] Error while creating the table`, { tableName, error });
      throw error;
    }
  }

  private async checkIfTableExists(tableName: string): Promise<boolean> {
    try {
      const tableExists = await this.dbConnector.schema.hasTable(tableName);
      if (tableExists) {
        console.log(`[DB] Table already exists`, { tableName });
        return true;
      }
      return false;
    }
    catch (error) {
      console.error(`[DB] Error while checking table existence`, { tableName });
      throw error;
    }
  }

}

const createTable = new CreateTable();
export { createTable };
