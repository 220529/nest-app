import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateTaroDto } from './dto/create-taro.dto';
import { UpdateTaroDto } from './dto/update-taro.dto';
import { WxLoginResponse } from './wx-login-response.interface';

@Injectable()
export class TaroService {
  private readonly appId = 'wxd0ded629672ac218'; // 替换为你的小程序 AppID
  private readonly appSecret = 'e841c23f8a09d354a5ae254dc8779276'; // 替换为你的小程序 AppSecret

  constructor(private readonly httpService: HttpService) {}

  create(createTaroDto: CreateTaroDto) {
    return 'This action adds a new taro';
  }

  findAll() {
    return `This action returns all taro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taro`;
  }

  update(id: number, updateTaroDto: UpdateTaroDto) {
    return `This action updates a #${id} taro`;
  }

  remove(id: number) {
    return `This action removes a #${id} taro`;
  }

  async login(code: string): Promise<WxLoginResponse> {
    const url = `https://api.weixin.qq.com/sns/jscode2session`;
    const params = {
      appid: this.appId,
      secret: this.appSecret,
      js_code: code,
      grant_type: 'authorization_code',
    };

    // 发起请求到微信 API
    const response = await lastValueFrom(this.httpService.get(url, { params }));
    console.log('response', response.data);

    const wxData: WxLoginResponse = response.data;

    // 检查是否成功获取 openid 和 session_key
    if (!wxData.openid || !wxData.session_key) {
      throw new Error('微信登录失败，无法获取 openid 或 session_key');
    }

    return wxData; // 返回微信接口的响应数据
  }
}
