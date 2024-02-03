import axios from "axios";
import config from "../config/config";

export async function instaRequest(url: string | undefined) {
	try {
		const options = {
			method: "GET",
			url: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
			params: {
				url,
			},
			headers: {
				"X-RapidAPI-Key": config.X_RAPIDAPI_KEY,
				"X-RapidAPI-Host": config.X_RAPIDAPI_HOST,
			},
		};

		const response = await axios.request(options);

		return response.data;
	} catch (error) {
		throw error;
	}
}
