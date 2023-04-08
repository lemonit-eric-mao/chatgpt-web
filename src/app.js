/**
 * 程序入口
 *
 * @Author: Eric.Mao
 * @Date: 2021/01/17 21:38
 */
// 引入系统模块
import os from 'os'
import path from 'path'

/**
 * 引入koa基本模块
 */
// 引入koa
import Koa from 'koa'
// 引入静态文件处理
import koaStatic from 'koa-static'

/**
 * 引入三方插件
 */
// 引入跨域
import cors from '@koa/cors'
// 引入logger
import logger from 'koa-logger'
// 压缩请求数据提高传输速度
import compress from "koa-compress"
// 引入请求数据解析器
import bodyParser from 'koa-bodyparser'
// 引入html渲染
import htmlRender from 'koa-html-render'

/**
 * 引入业务模块相关组件
 */
// 引入koa-views
import koaViews from 'koa-views'
// 引入路由
import Routes from './commons/routes'

/** ----------------------------------------------------------------------------------------------------------------- */

// 创建app实例
const app = new Koa();

// 配置端口号
const port = 3000;

// 指定静态资源文件目录(做为引用的前缀路径)，加载Makerdown静态模板文件
app.use(koaStatic('./web/static_docs'));
// 指定静态资源文件目录(做为引用的前缀路径)，加载Ejs的静态资源文件
app.use(koaStatic('./web/views_static'));

/** ----------------------------------------------------------------------------------------------------------------- */

// 跨域
app.use(cors());

// logger
app.use(logger());

// 压缩请求数据提高传输速度
app.use(compress());

// 数据解析, 并调整数据传输的限制，默认只支持json、form类型数据
// app.use(bodyParser({
//     enableTypes: ['json', 'form', 'text', 'xml'],
//     formLimit: '5mb',
//     jsonLimit: '5mb',
//     textLimit: '5mb'
// }));
app.use(bodyParser());

// html渲染
app.use(htmlRender());

// 渲染服务器 ejs文件
// 1. 先加载ejs模板文件
app.use(koaViews(path.join(__dirname, '../web/views'), {map: {html: 'ejs'}}))

// 2. 再添加路由功能
new Routes(app);

// 应用启动监听
app.listen(port, () => {
    const hostname = Object.values(os.networkInterfaces())
        .flat()
        .filter(details => details.family === 'IPv4' && !details.internal)
        .pop().address;

    console.info(`http://${hostname}:${port}`);
});

