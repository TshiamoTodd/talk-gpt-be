import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextToSpeechController } from './text-to-speech.controller';
import { ChatController } from './gpt.controller';
import { ChatService } from './gpt.service';
import { TextToSpeechService } from './text-to-speech.service';

@Module({
  imports: [],
  controllers: [TextToSpeechController, ChatController],
  providers: [TextToSpeechService, ChatService],
})
export class AppModule {}
