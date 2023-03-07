import express from "express";
import { userInfoController } from "../features/user/controllers/userInfoController";
import { checkAuthorizationMiddleware } from "../features/user/middleware/checkAuthorizationMiddleware";
import { createUserInfoMiddleware } from "../features/user/middleware/createUserInfoMiddleware";
import { getUserInfoMiddleware } from "../features/user/middleware/getUserInfoMiddleware";
import { updateUserInfoMiddleware } from "../features/user/middleware/updateUserInfoMiddleware";

const userInfoRoutes = express.Router();

userInfoRoutes.post(
    "/api/v1/userinfo/adduser",
    createUserInfoMiddleware.validateRequest,
    userInfoController.addUser
);

userInfoRoutes.get(
    "/api/v1/userinfo/user/:customerId",
    getUserInfoMiddleware.validateRequest,
    userInfoController.getUserInfo
);

userInfoRoutes.put(
    "/api/v1/userinfo/updateuser/:customerId",
    updateUserInfoMiddleware.validateRequest,
    userInfoController.updateUser
);

userInfoRoutes.get(
    "/api/v1/userinfo/isAuthorized/:customerId",
    checkAuthorizationMiddleware.validateRequest,
    userInfoController.checkAuthorization
);


export { userInfoRoutes };