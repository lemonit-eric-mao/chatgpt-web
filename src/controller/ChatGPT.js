import {Configuration, OpenAIApi} from "openai";


export default class ChatGPT {
    constructor() {
        this.configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY.trim(),
        });
        this.openai = new OpenAIApi(this.configuration);
    }

    async sendMessage(message) {
        /**
         * engine：要使用的模型的标识符。
         *      GPT-3.5 还提供了以下引擎：
         *      text-curie-001: Curie 引擎，对较长的文本可生成更优质的结果。
         *      text-babbage-001: Babbage 引擎，专注于通用语言生成任务，适用于较简单的应用场景。
         *      text-ada-001: Ada 引擎，适合于开发者用于测试和调试，并支持更多语言的输出。
         *      davinci-codex: Codex 引擎，基于 GPT-3.5 技术，支持编写编程代码。
         * prompt：文本输入（输入的文本）。
         * max_tokens：每个生成的文本的最大token数。
         * temperature：一个0-1之间的数字，表示多样性/随机性的度量标准。
         * n：生成的文本数量。
         * stop：一个字符串，表示生成文本的终止条件。
         * frequency_penalty：影响文本生成词频的复杂度的数字。
         */
        let parameters = {
            engine: 'gpt-3.5-turbo', // 使用GPT-3.5的text-davinci-002引擎
            prompt: `${message}`, // 生成文本的前缀
            max_tokens: 100, // 生成文本的最大token数
            temperature: 0.5, // 生成文本的多样性，0为不随机，1为完全随机
            n: 1, // 生成文本的数量
            stop: '\n', // 生成文本的终止符
            frequency_penalty: 0, // 影响生成文本词频复杂度的数字
        };

        try {
            let completion = await this.openai.createCompletion(parameters);
            let resultText = completion.data.choices[0].text;
            console.log(resultText);
            return resultText
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
