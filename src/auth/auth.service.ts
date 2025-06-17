import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/user/user.service";
import { CreateUserDto } from "@/user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(user: CreateUserDto): Promise<any> {
    const oldUser = await this.usersService.findOne({
      username: user.username,
    });
    if (oldUser?.password !== user.password) {
      throw new UnauthorizedException("Invalid username or password");
    }
    const { id, username, roles } = oldUser;
    return {
      access_token: await this.jwtService.signAsync({
        id,
        username,
        roleIds: roles.map((role) => role.id),
      }),
    };
  }

  async signup(user: CreateUserDto): Promise<any> {
    try {
      const oldUser = await this.usersService.findOne({
        username: user.username,
      });
      if (oldUser) {
        throw new ConflictException("User already exists!");
      }
      return await this.usersService.create(user as CreateUserDto);
    } catch (error) {
      return error;
    }
  }
}
