import { type ConversationFlavor } from "@grammyjs/conversations";
import { freeStorage } from "@grammyjs/storage-free";
import { Context, SessionFlavor, session } from "grammy";
import config from "../config/config";

export interface SessionData {
	isConversation: boolean;
}

export type MyContext = Context &
	ConversationFlavor &
	SessionFlavor<SessionData>;

function initial(): SessionData {
	return { isConversation: false };
}

export const setupSession = session({
	initial,
	storage: freeStorage<SessionData>(config.BOT_TOKEN),
});
