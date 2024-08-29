import { Injectable } from "@nestjs/common";
import {config} from 'dotenv';
import OpenAI from 'openai';



@Injectable()
export class ChatService {
    private openai: OpenAI;

    private conversationHistory: {
        role: "function" | "user" | "system" | "assistant";
        content: string;
        name: string;
    }[] = [];

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY!
        });
    }

    async chatWhitGPT(content: string) {
        this.conversationHistory.push({
            role: 'user',
            content,
            name: 'User'
        });

        const chatCompletion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                ...this.conversationHistory
            ],
            model: 'gpt-3.5-turbo',
        });

        this.conversationHistory.push({
            role: 'assistant',
            content: chatCompletion.choices[0].message.content,
            name: 'Assistant'
        });

        return chatCompletion.choices[0].message.content;
    }
}