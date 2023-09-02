import { Test, TestingModule } from '@nestjs/testing';
import { MovesService } from './moves.service';
import { MakeMoveDto } from './dto/make-move.dto';

class MovesServiceMock {
  makeMove() {
    return Promise.resolve({});
  }
}

describe('MovesService', () => {
  let service: MovesService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [{ provide: MovesService, useClass: MovesServiceMock }],
    }).compile();

    service = moduleRef.get<MovesService>(MovesService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call makeMove method with param', async () => {
    const makeMoveSpy = jest.spyOn(service, 'makeMove');
    const dto = new MakeMoveDto();
    service.makeMove(dto);
    expect(makeMoveSpy).toHaveBeenCalledWith(dto);
  });
});
