import Knex from "knex";
import hostedDbConnector from "./HostedDbConnector";
import localDbConnector from "./localDbConnector";

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();


class DBConnector {
    dbConnector: Knex;
  
    constructor() {
      if (appEnv.isLocal) {
        console.log("[DB] Connected to local environment");
        this.dbConnector = Knex(localDbConnector.getUrl() as object);
      } else {
        console.log("[DB] Connected to hosted environment");
        this.dbConnector = Knex(hostedDbConnector.getUrl());
      }
    }

}

const db = new DBConnector();
export default db;