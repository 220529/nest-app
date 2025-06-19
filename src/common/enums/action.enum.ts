export enum Action {
  // 基本CRUD操作
  Create = "create", // 创建资源
  Read = "read", // 读取资源
  Update = "update", // 更新资源
  Delete = "delete", // 删除资源

  // 特殊操作
  Manage = "manage", // 管理(所有操作) - 相当于CRUD + 特殊操作
  List = "list", // 列出资源集合
  Restore = "restore", // 恢复已删除的资源
  Audit = "audit", // 审计/查看日志

  // 特定领域操作
  Publish = "publish", // 发布作品
  Approve = "approve", // 审批内容
  Reject = "reject", // 拒绝内容
  Download = "download", // 下载资源
  Upload = "upload", // 上传资源

  // 用户相关特殊操作
  Login = "login", // 登录
  ResetPassword = "reset-password", // 重置密码
  ChangeRole = "change-role", // 更改角色
}
