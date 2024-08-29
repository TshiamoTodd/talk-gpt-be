import { Controller, Post, Body, Res } from "@nestjs/common";
import { TextToSpeechService } from "./text-to-speech.service";
import { Response } from "express";
import { ChatService } from "./gpt.service";

@Controller('text-to-speech')
export class TextToSpeechController {
    constructor(
        private readonly textToSpeechService: TextToSpeechService,
        private readonly chatService: ChatService
    ) {}

    @Post('synthesize')
    async synthesize(@Body('text') text: string, @Res() res: Response) {
        try {
            const gptResponse = await this.chatService.chatWhitGPT(text);

            const requestBody = {
                input: { text: gptResponse },
                voice: { languageCode: 'en-US', ssmlGender: 'FEMALE', name: 'en-US-Wavenet-F' },
                audioConfig: { audioEncoding: 'MP3' },
            };

            const audioContent = await this.textToSpeechService.synthesizeSpeech(requestBody);

            res.setHeader('Content-Type', 'audio/mpeg');
            res.end(audioContent);
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occured while synthesizing the speech');
        }
    }
}
