import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { JsonSerializePipe } from "@/common/pipes/json-serialize.pipe";

export class CreateWorkDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => new JsonSerializePipe().transform(value))
  public content: string;
}
