import { Test, TestingModule } from '@nestjs/testing';
import { TaroController } from './taro.controller';
import { TaroService } from './taro.service';

describe('TaroController', () => {
  let controller: TaroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaroController],
      providers: [TaroService],
    }).compile();

    controller = module.get<TaroController>(TaroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
