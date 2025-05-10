#!/bin/bash

# 停止并移除容器
docker compose down

# 删除指定的卷
docker volume rm nest-app_nest_db

# 重新启动容器（后台模式）
docker compose up -d