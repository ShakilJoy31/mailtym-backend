"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    verification_url: process.env.VERIFICATION_URL,
    email: process.env.EMAIL,
    email_password: process.env.EMAIL_PASSWORD,
    jwt: {
        token_secret: process.env.TOKEN_SECRET,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        token_expirein: process.env.TOKEN_EXPIREIN,
        refresh_token_expirein: process.env.REFRESH_TOKEN_EXPIREIN,
    },
};
