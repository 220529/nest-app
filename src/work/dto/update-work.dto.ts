// update-work.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateWorkDto } from "@/work/dto/create-work.dto";

export class UpdateWorkDto extends PartialType(CreateWorkDto) {}
