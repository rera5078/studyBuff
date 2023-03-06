import Knex from "knex";
import localDbConnector from "./localDbConnector";

class DBConnector {
    dbConnector: any;

    constructor(){
        console.log("[DB] Connected to local environment");
        this.dbConnector = Knex(localDbConnector.getUrl() as object);
    }
}

const db = new DBConnector();
export default db;