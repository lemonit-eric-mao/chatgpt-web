/**
 * 注解的加载顺序是先完成方法内部的配置
 * 然后在执行类注解内部的配置
 *
 * 在controller中的使用:
 *     import {Controller, GET} from "../commons/annotation/decorator";
 *
 *     @Controller('/demo')
 *     export default class HelloController {
 *
 *         @GET('/hello')
 *         async hello(ctx) {
 *             ctx.body = 'Hello!'
 *         }
 *
 *     }
 *
 *
 * 在app.js中的使用:
 *     import router from './controller/DemoController'
 *     // 添加路由功能
 *     app.use(router.routes());
 *     app.use(router.allowedMethods());
 *
 */

import KoaRouter from 'koa-router'

/**
 * 类注解
 *   类注解在这里只做路由前缀作用
 * @param prefix 配置路由前缀
 * @returns {function(*): *}
 * @constructor
 */
export default function Controller(prefix) { // 这一层是类的注解层

    let router = new KoaRouter()

    if (prefix) {
        router.prefix(prefix)
    }

    /**
     * @param target 类对象
     */
    return function (target) {  // 这一层表示注解所对应的类对象的相关信息
        // 获取类中的所有方法
        let reqList = Object.getOwnPropertyDescriptors(target.prototype)
        for (let v in reqList) {
            // 排除类的构造方法
            if (v !== 'constructor') {
                let fn = reqList[v].value
                // 将路由对象传给上面的方法注解配置，将带有注解的方法加入到路由中，完成最后的路由配置
                fn(router)
            }
        }
        return router
    }
}

