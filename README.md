###### 安装依赖
``` ruby
npm i

```

###### 一键部署
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lemonit-eric-mao/chatgpt-web-server&env=OPENAI_API_KEY&project-name=chatgpt-web-server&repository-name=ChatGPT-Web-Server)


---

---

---

###### 启动
``` shell
## linux系统启动
OPENAI_API_KEY=$OPENAI_API_KEY && npm start

## win系统启动
set OPENAI_API_KEY=$OPENAI_API_KEY && npm start


## 访问静态文档页面
http://192.168.2.10:3000/

## 访问服务端渲染页面
http://192.168.2.10:3000/test/info/1

```

---

###### 构建dist/

``` ruby
npm run build

```

---

###### 测试dist服务

``` ruby
npm run dist

```

---

---

---

###### 构建Docker镜像
``` ruby
## 下载项目
git clone https://gitee.com/eric-mao/chatgpt-web-server.git

## 进入目录
cd chatgpt-web-server/

## 构建镜像
docker build -t chatgpt-web-server:0.1.0 .

## docker测试
docker run --rm -it -p 8080:3000 chatgpt-web-server:0.1.0
```

---

###### 创建docker-compose.yaml
``` yaml
version: '3.1'
services:
  chatgpt-web-server:
    image: chatgpt-web-server:0.1.0
    container_name: chatgpt-web-server
    restart: always
    ports:
      - 8080:3000
    hostname: eric_koa2_server

    volumes:
      # 容器与宿主机时间同步
      - /etc/localtime:/etc/localtime
    environment:
      DB_HOST: '192.168.2.10'
      DB_PORT: '3306'
      DATABASE: 'oidc_auth'
      DB_USER: 'root'
      DB_PASSWORD: 'yourpasswd'

```

---

``` ruby

## 访问服务端渲染页面
http://192.168.2.10:8080/test/info/1

```

---

---

---

---

---

---

##### 项目框架说明

###### 配置babel去支持es6语法

接着在根目录下新建`.babelrc`文件，增加babel配置：

``` json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}

```

**修改 package.json**

``` ruby

......

    "scripts": {
        "start": "babel-node src/app.js",
    },
    
......

```

---

---

---

###### 实现热更新 修改 package.json

``` ruby

......

    "scripts": {
        "start": "nodemon --exec babel-node src/app.js",
    },
    
......

```

---

---

---

---

---

---

###### 让代码中可以使用注解功能
``` ruby
npm install -D @babel/plugin-proposal-decorators
```

###### 在.babelrc文件中加入如下配置
``` json 
{
    "presets": [
        ......
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    ]
}

```

###### 在任意位置测试
``` javascript
@isTestable(true)
class MyClass {
}

function isTestable(value) {
    return function decorator(target) {
        target.isTestable = value;
    };
}

console.log(MyClass.isTestable)

```

---

---

---

