import { Controller, HttpCode, HttpStatus, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { Public } from "@/decorators/public.decorator";

@ApiTags("auth服务")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "登录接口" })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("login")
  signIn(@Body() user: CreateUserDto) {
    return this.authService.signIn(user);
  }

  @ApiOperation({ summary: "注册接口" })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("signup")
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }
}
