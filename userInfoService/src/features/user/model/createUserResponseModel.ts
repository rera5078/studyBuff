import { Operation } from "../../../externalServices/database/enums/operation";

export interface CreateUserResponseModel {
    userId?: number;
    status: Operation;
  }