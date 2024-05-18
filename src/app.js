"use strict";
/**
 * Title: 'Initial Project with professtional Error Handling setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 18-01-2024
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/modules/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Server Working successfully');
});
app.use('/api/v1/', routes_1.default);
exports.default = app;
