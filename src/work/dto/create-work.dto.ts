import { IsNotEmpty, IsString } from "class-validator";

export class CreateWorkDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public content: string;
}
