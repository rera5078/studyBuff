import { environmentVariables } from "../../configurations/environmentVariables";

class LocalDbConnector {
  public getUrl() {
    return {
      client: "pg",
      connection: environmentVariables.DB_URL
    };
  }
}

const localDbConnector = new LocalDbConnector();
export default localDbConnector;
