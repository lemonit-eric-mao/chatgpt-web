import Controller from "../commons/annotation/Controller";
import GET from "../commons/annotation/GET";
// import POST from "../commons/annotation/POST";
// import PUT from "../commons/annotation/PUT";
// import DELETE from "../commons/annotation/DELETE";

import ChatGPT from "./ChatGPT";

@Controller('/api')
export default class ChatGPTController {

    constructor() {
    }

    @GET('/send/:message')
    async sendMessage(ctx) {
        try {
            let result = await new ChatGPT().sendMessage(ctx.params.message);
            await ctx.render('index', {"data": result});
        } catch (e) {
            await ctx.render('index', {"data": e});
        }
    }
}
