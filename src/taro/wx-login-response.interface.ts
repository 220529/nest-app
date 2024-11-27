// src/auth/wx-login-response.interface.ts
export interface WxLoginResponse {
  openid: string;
  session_key: string;
  unionid?: string; // 可能存在 unionid
  errcode?: number;
  errmsg?: string;
}
