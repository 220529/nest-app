import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { WxLoginResponse } from './wx-login-response.interface';

@Injectable()
export class AuthService {
  private readonly appId = 'wxd0ded629672ac218'; // 替换为你的小程序 AppID
  private readonly appSecret = 'e841c23f8a09d354a5ae254dc8779276'; // 替换为你的小程序 AppSecret

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async signIn(user: CreateUserDto): Promise<any> {
    const oldUser = await this.userService.findOneByParams({
      // username: user.username,
    });
    // if (oldUser?.password !== user.password) {
    //   throw new UnauthorizedException('Invalid username or password');
    // }
    return this.createToken(oldUser);
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.findOneByParams({
      // username: createUserDto.username,
    });
    if (user) {
      throw new ConflictException('User already exists!');
    }
    const newUser = await this.userService.create(
      createUserDto as CreateUserDto,
    );
    return this.createToken(newUser);
  }

  async createToken(user: any) {
    const { openid, nickName } = user;
    return {
      access_token: await this.jwtService.signAsync({
        openid,
        nickName,
      }),
    };
  }

  async loginByWechat(code: string) {
    const url = `https://api.weixin.qq.com/sns/jscode2session`;
    const params = {
      appid: this.appId,
      secret: this.appSecret,
      js_code: code,
      grant_type: 'authorization_code',
    };

    // 发起请求到微信 API
    const response = await lastValueFrom(this.httpService.get(url, { params }));
    const wxData: WxLoginResponse = response.data;

    console.log('wxData', wxData);

    let oldUser = await this.userService.findOneByParams({
      openid: wxData.openid,
    });

    if (!oldUser) {
      wxData.nickName = `用户_${Date.now()}`;
      wxData.avatar =
        'https://static.lagou.com/wx-mina/static/img/lagou-mina/common/avatar-default_171612a.png';
      oldUser = await this.userService.create(wxData);
    }

    return this.createToken(oldUser);
  }
}
