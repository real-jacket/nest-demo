import { Test, TestingModule } from '@nestjs/testing';
import { DddController } from './ddd.controller';
import { DddService } from './ddd.service';

describe('DddController', () => {
  let controller: DddController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DddController],
      providers: [DddService],
    }).compile();

    controller = module.get<DddController>(DddController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
