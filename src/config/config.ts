import dotenv from "dotenv";
dotenv.config();

export default {
	BOT_TOKEN: process.env.BOT_TOKEN as string,
	X_RAPIDAPI_KEY: process.env.X_RAPIDAPI_KEY,
	X_RAPIDAPI_HOST: process.env.X_RAPIDAPI_HOST,
};
