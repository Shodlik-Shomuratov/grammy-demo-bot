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
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieConversation = void 0;
function movieConversation(conversation, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ctx.reply("How many favorite movies do you have?");
        const count = yield conversation.form.number();
        const movies = [];
        for (let i = 0; i < count; i++) {
            yield ctx.reply(`Tell me number ${i + 1}!`);
            const titleCtx = yield conversation.waitFor(":text");
            movies.push(titleCtx.msg.text);
        }
        yield ctx.reply("Here is a better ranking!");
        movies.sort();
        yield ctx.reply(movies.map((m, i) => `${i + 1}. ${m}`).join("\n"));
    });
}
exports.movieConversation = movieConversation;
