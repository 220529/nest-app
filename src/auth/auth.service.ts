import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/users/users.service";
import { CreateUserDto } from "@/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(user: CreateUserDto): Promise<any> {
    const oldUser = await this.usersService.findOne({
      username: user.username,
    });
    if (oldUser?.password !== user.password) {
      throw new UnauthorizedException("Invalid username or password");
    }

    const { id, username } = oldUser;
    return {
      access_token: await this.jwtService.signAsync({ id, username }),
    };
  }

  async signup(user: CreateUserDto): Promise<any> {
    const oldUser = await this.usersService.findOne({
      username: user.username,
    });
    if (oldUser) {
      throw new ConflictException("User already exists!");
    }
    return await this.usersService.create(user as CreateUserDto);
  }
}
