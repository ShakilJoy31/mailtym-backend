"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const path_1 = __importDefault(require("path"));
// custom formet
const customFormet = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return ` [${label}] ${level}: ${message}-> ${date.toDateString()} ${hour}:${minutes}m:${seconds}s`;
});
const logger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'right meow!' }), timestamp(), customFormet),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'succeses', 'success-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.logger = logger;
const errorLogger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'right meow!' }), timestamp(), customFormet, prettyPrint()),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.errorLogger = errorLogger;
