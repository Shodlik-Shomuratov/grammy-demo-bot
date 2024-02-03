import { Bot, webhookCallback } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import config from "./config/config";
import { MyContext, setupSession } from "./session/session";
import { instaRequest } from "./axios/instagram";
import { startConversation } from "./conversations/start.conversation";

if (!config.BOT_TOKEN) {
	throw new Error("BOT_TOKEN is unset");
}

const bot = new Bot<MyContext>(config.BOT_TOKEN);

bot.use(setupSession);
bot.use(conversations());
bot.use(createConversation(startConversation));

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

bot.command("start", async (ctx) => {
	await ctx.conversation.enter("startConversation");
});

bot.on("message::url", async (ctx) => {
	await ctx.reply("Please wait a little bit ...");
	const url = ctx.message.text;

	const instaData = await instaRequest(url);
	await ctx.replyWithVideo(instaData[0].url, {
		caption: `${instaData[0].title}\n\n@insta_kachka_bot`,
	});
});

bot.catch((error) => {
	console.error(error?.message);
});
// bot.start({
// 	onStart(botInfo) {
// 		console.log("Started");
// 	},
// });

export default webhookCallback(bot, "http");
