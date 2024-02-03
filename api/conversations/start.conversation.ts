import { Conversation } from "@grammyjs/conversations";
import { MyContext } from "../session/session";
import { InputFile, Keyboard } from "grammy";
import util from "util";
import fs from "fs";

export type MyConversation = Conversation<MyContext>;

export async function startConversation(
	conversation: MyConversation,
	ctx: MyContext
) {
	await ctx.reply("What is your <b>firstname</b>?", {
		parse_mode: "HTML",
	});
	const firstnamePayload = await conversation.waitFor(":text");
	const firstname = firstnamePayload.message?.text;

	await ctx.reply("What is your <b>lastname</b>?", {
		parse_mode: "HTML",
	});
	const lastnamePayload = await conversation.waitFor(":text");
	const lastname = lastnamePayload.message?.text;

	await ctx.reply("Could you share your <b>phone number</b>?", {
		parse_mode: "HTML",
		reply_markup: new Keyboard().requestContact("Share Contact!").resized(),
	});
	const phoneNumberPayload = await conversation.waitFor(":contact");
	const phoneNumber = phoneNumberPayload.message?.contact.phone_number;

	const readFile = util.promisify(fs.readFile);
	const congratsImage = new InputFile(
		await readFile("./public/images/congrats.jpg")
	);
	await ctx.replyWithPhoto(congratsImage, {
		caption: `Congratulations 🎉. You signed up successfully!\n\n<b>Firsname</b>: ${firstname}\n<b>Lastname</b>: ${lastname}\n<b>Phone number</b>: <tg-spoiler>${phoneNumber}</tg-spoiler>\n\nSend me any instagram video url. I will download it for you!`,
		reply_markup: {
			remove_keyboard: true,
		},
		parse_mode: "HTML",
	});

	return;
}
