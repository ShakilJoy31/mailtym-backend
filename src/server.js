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
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./config/index"));
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./shared/logger");
process.on('uncaughtException', () => {
    logger_1.errorLogger.error('uncaughtException detected ...');
    process.exit(1);
});
let server;
const Run = async () => {
    try {
        await mongoose_1.default.connect(index_1.default.database_url);
        logger_1.logger.info('Database is connected');
        server = app_1.default.listen(index_1.default.port, () => {
            logger_1.logger.info(`Example app listening on port ${index_1.default.port}`);
        });
    }
    catch (error) {
        logger_1.errorLogger.error('something is wrong', error);
    }
    process.on('unhandledRejection', (reason, promise) => {
        logger_1.logger.error(`Unhandle Rejection is detected resion ${reason}  , and promise ${promise} we are closing our server`);
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
};
Run();
process.on('SIGTERM', () => {
    logger_1.errorLogger.error('Sigterm is Recived');
    if (server) {
        server.close();
    }
});
