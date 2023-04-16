import { environmentVariables } from "../../configurations/environmentVariables";


class HostedDbConnector {
  public getUrl() {
    return {
      client: "pg",
      connection: environmentVariables.DB_URL,
      pool: {
        idleTimeoutMillis: 10 * 1000
      }
    };
  }
}

const hostedDbConnector = new HostedDbConnector();
export default hostedDbConnector;