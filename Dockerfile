FROM node:18.6.0-alpine

# 设置该dockerfile的作者和联系邮箱
MAINTAINER 85785053@qq.com

# RUN mkdir -p 用于在Image里创建一个文件夹，将来用于保存我们的代码
RUN mkdir -p /app

# WORKDIR 是将我们创建的文件夹做为工作目录
WORKDIR /app

# COPY是把本机当前目录下的所有文件拷贝到Image的工作目录下
COPY . /app

# 配置服务器端口
EXPOSE 3000

# 初始化项目
RUN npm install -g cnpm --registry=https://registry.npmmirror.com \
    && cnpm i

# 最后 配置启动项目的命令
CMD ["npm", "start"]
