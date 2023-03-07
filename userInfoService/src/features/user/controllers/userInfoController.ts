import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { checkAuthorizationService } from "../service/checkAuthorizationService";
import { createUserService } from "../service/createUserService";
import { getUserService } from "../service/getUserService";
import { updateUserService } from "../service/updateUserService";

class UserInfoController {
    async addUser(req: Request, res: Response) {
        console.log("[Controller] Add User", { input: req.body });
        req.body.userId = req.body.email
        const result = await createUserService.create(req.body)
        res.status(HttpStatus.OK);
        res.send(result);
    }

    async updateUser(req: Request, res: Response) {
        console.log("[Controller] Update User", { input: req.body })
        const result = await updateUserService.update(req.params.userId, req.body)
        res.status(result.status);
        res.send(result.data);
    }

    async getUserInfo(req: Request, res: Response) {
        console.log("[Controller] Get User", { input: {userId: req.params.userId} })
        const result = await getUserService.get(req.params.userId)
        res.status(result.status);
        res.send(result.data);
    }

    async checkAuthorization(req: Request, res: Response) {
        console.log("[Controller] Check Authorization", { input: {userId: req.params.userId} })
        const result = await checkAuthorizationService.getCustomerInfoIfAuthorized(req.params.userId, req.query.password as string)
        res.status(result.status);
        res.send(result.data);
    }

}

const userInfoController = new UserInfoController()
export { userInfoController }