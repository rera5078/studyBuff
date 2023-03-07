import HttpStatus from "http-status-codes";
import { Operation } from "../../../externalServices/database/enums/operation";

export class GetStausCode {
    operationToStatusCode(status: Operation) {
        switch (status) {
            case Operation.Success: {
                return HttpStatus.OK;
            }
            case Operation.AlreadyExists: {
                return HttpStatus.CONFLICT;
            }
            case Operation.Error: {
                return HttpStatus.INTERNAL_SERVER_ERROR;
            }
            default: {
                return HttpStatus.BAD_REQUEST;
            }
        }
    }
}

const getStatusCode = new GetStausCode();
export { getStatusCode };