import ChatGPTController from '../../controller/ChatGPTController'

/**
 * 将Controller加入到路由表
 */
class RouterClass {
    constructor(app) {
        app.use(ChatGPTController.routes());
    }
}

export default RouterClass
