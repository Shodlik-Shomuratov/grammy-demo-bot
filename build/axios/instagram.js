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
exports.instaRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
function instaRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                method: "GET",
                url: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
                params: {
                    url,
                },
                headers: {
                    "X-RapidAPI-Key": config_1.default.X_RAPIDAPI_KEY,
                    "X-RapidAPI-Host": config_1.default.X_RAPIDAPI_HOST,
                },
            };
            const response = yield axios_1.default.request(options);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.instaRequest = instaRequest;
