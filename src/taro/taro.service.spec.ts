import { Test, TestingModule } from '@nestjs/testing';
import { TaroService } from './taro.service';

describe('TaroService', () => {
  let service: TaroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaroService],
    }).compile();

    service = module.get<TaroService>(TaroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
