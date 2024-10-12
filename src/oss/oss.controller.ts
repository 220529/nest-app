import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { OssService } from './oss.service';
import { UploadDto } from './upload.dto';

@ApiTags('oss')
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBody({
    description: 'List of cats',
    type: UploadDto,
  })
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('files', files);

    return await this.ossService.multipleUpload(files);
  }
}
