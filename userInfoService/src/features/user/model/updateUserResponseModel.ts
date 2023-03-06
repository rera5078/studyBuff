import { Operation } from "../../../externalServices/database/enums/operation";
import UserModelDTO from "../../../externalServices/database/models/DTO/userModelDTO";


export interface UpdateUserResponseModel {
    data?: UserModelDTO;
    status: Operation;
  }