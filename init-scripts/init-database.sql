-- 精简版权限初始化
INSERT INTO `permission` (`code`, `name`) VALUES
('user:read', '查看用户'),
('user:manage', '用户管理'),
('work:create', '创建作品'),
('work:manage_own', '管理自有作品'),
('work:manage_all', '管理所有作品'),
('system:config', '系统配置');

-- 角色权限关联
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`)
SELECT r.id, p.id FROM role r, permission p WHERE 
(r.code = 'user' AND p.code IN ('user:read', 'work:create', 'work:manage_own')) OR
(r.code = 'admin' AND p.code IN ('user:read', 'work:create', 'work:manage_all')) OR
(r.code = 'superadmin' AND p.code IN ('user:manage', 'system:config'));