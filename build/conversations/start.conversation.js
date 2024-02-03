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
exports.startConversation = void 0;
const grammy_1 = require("grammy");
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
function startConversation(conversation, ctx) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        yield ctx.reply("What is your <b>firstname</b>?", {
            parse_mode: "HTML",
        });
        const firstnamePayload = yield conversation.waitFor(":text");
        const firstname = (_a = firstnamePayload.message) === null || _a === void 0 ? void 0 : _a.text;
        yield ctx.reply("What is your <b>lastname</b>?", {
            parse_mode: "HTML",
        });
        const lastnamePayload = yield conversation.waitFor(":text");
        const lastname = (_b = lastnamePayload.message) === null || _b === void 0 ? void 0 : _b.text;
        yield ctx.reply("Could you share your <b>phone number</b>?", {
            parse_mode: "HTML",
            reply_markup: new grammy_1.Keyboard().requestContact("Share Contact!").resized(),
        });
        const phoneNumberPayload = yield conversation.waitFor(":contact");
        const phoneNumber = (_c = phoneNumberPayload.message) === null || _c === void 0 ? void 0 : _c.contact.phone_number;
        const readFile = util_1.default.promisify(fs_1.default.readFile);
        const congratsImage = new grammy_1.InputFile(yield readFile("./public/images/congrats.jpg"));
        yield ctx.replyWithPhoto(congratsImage, {
            caption: `Congratulations 🎉. You signed up successfully!\n\n<b>Firsname</b>: ${firstname}\n<b>Lastname</b>: ${lastname}\n<b>Phone number</b>: <tg-spoiler>${phoneNumber}</tg-spoiler>\n\nSend me any instagram video url. I will download it for you!`,
            reply_markup: {
                remove_keyboard: true,
            },
            parse_mode: "HTML",
        });
        return;
    });
}
exports.startConversation = startConversation;
