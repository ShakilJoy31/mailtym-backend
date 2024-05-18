"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const addUsers = (0, catchAsync_1.default)(async (req, res) => {
    const { data } = req.body;
    const post = await auth_service_1.AuthenticationService.createUser(data);
    // Send success response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: post,
    });
});
const getUsers = (0, catchAsync_1.default)(async (req, res) => {
    const users = await auth_service_1.AuthenticationService.getUsers();
    // Send success response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: users,
    });
});
exports.AuthenticationController = {
    getUsers,
    addUsers
};
