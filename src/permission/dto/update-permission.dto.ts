import { PartialType } from "@nestjs/swagger";
import { CreatePermissionDto } from "@/permission/dto/create-permission.dto";

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
