"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const conversations_1 = require("@grammyjs/conversations");
const config_1 = __importDefault(require("./config/config"));
const session_1 = require("./session/session");
const instagram_1 = require("./axios/instagram");
const start_conversation_1 = require("./conversations/start.conversation");
if (!config_1.default.BOT_TOKEN) {
    throw new Error("BOT_TOKEN is unset");
}
const bot = new grammy_1.Bot(config_1.default.BOT_TOKEN);
bot.use(session_1.setupSession);
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(start_conversation_1.startConversation));
bot.api.setMyCommands([
    {
        command: "start",
        description: "To start the bot click this!",
    },
    {
        command: "help",
        description: "To get a help or instruction click this!",
    },
]);
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.conversation.enter("startConversation");
}));
bot.on("message::url", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Please wait a little bit ...");
    const url = ctx.message.text;
    const instaData = yield (0, instagram_1.instaRequest)(url);
    yield ctx.replyWithVideo(instaData[0].url, {
        caption: `${instaData[0].title}\n\n@insta_kachka_bot`,
    });
}));
bot.catch((error) => {
    console.error(error === null || error === void 0 ? void 0 : error.message);
});
// bot.start({
// 	onStart(botInfo) {
// 		console.log("Started");
// 	},
// });
exports.default = (0, grammy_1.webhookCallback)(bot, "http");
