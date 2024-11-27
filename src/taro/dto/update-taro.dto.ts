import { PartialType } from '@nestjs/swagger';
import { CreateTaroDto } from './create-taro.dto';

export class UpdateTaroDto extends PartialType(CreateTaroDto) {}
