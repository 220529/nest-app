import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  BadRequestException,
} from "@nestjs/common";
import { PaginationDto } from "@/common/dto/pagination.dto";
import { WorkService } from "@/work/work.service";
import { CreateWorkDto } from "@/work/dto/create-work.dto";
import { UpdateWorkDto } from "@/work/dto/update-work.dto";
import { Work } from "@/work/entities/work.entity";
import { Action } from "@/common/enums/action.enum";
import {
  CaslSubject,
  CaslAction,
} from "@/common/decorators/casl-subject.decorator";

@Controller("work")
@CaslSubject(Work)
export class WorkController {
  constructor(private readonly worksService: WorkService) {}

  @Post()
  create(
    @Request() req,
    @Body()
    createWorkDto: CreateWorkDto
  ) {
    return this.worksService.create(req.user.id, createWorkDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.worksService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.worksService.findOne({ id: +id });
  }

  @Patch(":id")
  @CaslAction(Action.Update)
  update(@Request() req, @Param("id") id: string, @Body() dto: UpdateWorkDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException("至少需要提供一个有效字段");
    }
    return this.worksService.update(req.user.id, +id, dto);
  }

  @Delete(":id")
  @CaslAction(Action.Delete)
  delete(@Param("id") id: string) {
    return this.worksService.delete(+id);
  }
}
