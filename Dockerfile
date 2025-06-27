# 第一阶段：构建阶段
FROM node:22-alpine AS builder

# 1. 启用并安装 PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2. 设置工作目录
WORKDIR /app

# 2. 使用官方源（或稳定的镜像）
RUN pnpm config set registry https://registry.npmjs.org/

# 3. 设置国内镜像源（可选）
# RUN pnpm config set registry https://registry.npmmirror.com

# 4. 先复制包管理文件（利用Docker缓存层）
COPY pnpm-lock.yaml package.json ./

# 5. 安装依赖（包括构建所需的devDependencies）
RUN pnpm install --frozen-lockfile

# 6. 复制所有源代码
COPY . .

# 7. 运行构建
RUN pnpm run build

# 8. 移除开发依赖
RUN pnpm prune --prod

# 第二阶段：生产镜像
FROM node:22-alpine

# 1. 启用PNPM（生产环境也需要）
RUN corepack enable

# 2. 设置工作目录
WORKDIR /app

# 3. 从构建阶段复制必要文件
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

ENV NEST_PORT=3050
EXPOSE 3050

# 4. 启动应用（直接运行编译后的JS）
CMD ["node", "dist/main.js"]