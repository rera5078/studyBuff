import bodyParser from "body-parser";
import cors from 'cors';
import express from "express";
import { userInfoRoutes } from "./routes/userInfoRoutes";
import { environmentVariables } from "./configurations/environmentVariables";
import { TableInitializer } from "./externalServices/database/tables/intialization";

const port = environmentVariables.PORT;
const app = express();

function checkErrors(err: any, req: any, res: any, next: any) {
  if (err instanceof SyntaxError && err.message.indexOf("JSON")) {
    res.status(400).json({ errorCode: 100, Ref: "Error parsing JSON" });
  } else {
    res.status(400).json({ errorCode: 101, Ref: "Error parsing JSON" });
  }
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkErrors);
app.use(userInfoRoutes);

async function main() {
  await TableInitializer.init()
    .then(async () => {
      console.log("Database up !!!");
      // return messageQ.init();
    })
    .then(async () => {
      console.log("Broker up !!!");
      console.log("Application started on port " + port);
      app.listen(port);
    })
    .catch(async (error: any) => {
      console.error("Error setting up service", { error: error });
    });
}

main();
export { app };