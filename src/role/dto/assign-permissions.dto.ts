// src/modules/role/dto/assign-permissions.dto.ts
import { IsArray, IsNumber } from "class-validator";

export class AssignPermissionsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  permissionIds: number[];
}
