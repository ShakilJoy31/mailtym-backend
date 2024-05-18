"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModel = void 0;
const mongoose_1 = require("mongoose");
const AuthenticationSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    contactNumber: { type: Number },
});
exports.AuthenticationModel = (0, mongoose_1.model)('authenticatedUsers', AuthenticationSchema);
