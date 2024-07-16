FROM node:18-alpine
# 在容器内创建工作目录
WORKDIR /nest-app
# 下载依赖
COPY package.json package-lock.json /nest-app
RUN npm i
# 构建项目
COPY . /nest-app
RUN npm run build
EXPOSE 16800
CMD npm run start:prod