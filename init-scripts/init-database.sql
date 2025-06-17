-- 创建数据库(如果不存在)
CREATE DATABASE IF NOT EXISTS v1_base 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE v1_base;

-- 设置连接字符集
SET NAMES 'utf8mb4';

-- 1. 创建角色表
CREATE TABLE IF NOT EXISTS `role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 创建权限表
CREATE TABLE IF NOT EXISTS `permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255),
  `isActive` BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 创建角色权限关联表
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`role_id`) REFERENCES `role`(`id`),
  FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`),
  UNIQUE KEY `unique_role_permission` (`role_id`, `permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 初始化角色 (保持3个基础角色)
INSERT IGNORE INTO `role` (`code`, `name`, `description`) VALUES
('user', '普通用户', '基础用户角色'),
('admin', '管理员', '系统管理员'),
('superadmin', '超级管理员', '系统超级管理员');

-- 5. 精简权限 (使用work而非content)
INSERT IGNORE INTO `permission` (`code`, `name`, `description`, `isActive`) VALUES
('user:manage', '用户管理', '用户账号的增删改查', TRUE),
('work:manage', '作品管理', '所有作品的增删改查', TRUE),
('system:config', '系统配置', '修改系统核心配置', TRUE);

-- 6. 角色权限关联
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`)
SELECT r.id, p.id FROM role r, permission p WHERE 
(r.code = 'user' AND p.code = 'work:manage') OR
(r.code = 'admin' AND p.code IN ('user:manage', 'work:manage')) OR
(r.code = 'superadmin' AND p.code IN ('user:manage', 'work:manage', 'system:config'));