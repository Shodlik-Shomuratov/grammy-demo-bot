"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSession = void 0;
const storage_free_1 = require("@grammyjs/storage-free");
const grammy_1 = require("grammy");
const config_1 = __importDefault(require("../config/config"));
function initial() {
    return { isConversation: false };
}
exports.setupSession = (0, grammy_1.session)({
    initial,
    storage: (0, storage_free_1.freeStorage)(config_1.default.BOT_TOKEN),
});
