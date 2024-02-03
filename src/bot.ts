import { Bot, webhookCallback } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import config from "./config/config";
import { MyContext, setupSession } from "./session/session";
import { instaRequest } from "./axios/instagram";
import { startConversation } from "./conversations/start.conversation";
import express from "express";

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

if (process.env.NODE_ENV === "DEVELOPMENT") {
	bot.start({
		onStart(botInfo) {
			console.log("Started");
		},
	});
} else {
	const port = process.env.PORT || 3000;
	const app = express();
	app.use(express.json());
	app.use(`/${bot.token}`, webhookCallback(bot, "express"));

	app.get("/", (req, res) => {
		res.json({
			status: "OK",
			message: "Bot server is running",
		});
	});

	app.listen(port, () => console.log(`listening on port ${port}`));
}
