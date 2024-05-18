"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const auth_model_1 = require("./auth.model");
const getUsers = async () => {
    const users = await auth_model_1.AuthenticationModel.find();
    return users;
};
const createUser = async (payload) => {
    // checking user existed
    const users = await auth_model_1.AuthenticationModel.create(payload);
    return users;
};
exports.AuthenticationService = {
    getUsers,
    createUser
};
