import { Test, TestingModule } from '@nestjs/testing';
import { GoogleAuthenticatorController } from './google-authenticator.controller';

describe('GoogleAuthenticatorController', () => {
  let controller: GoogleAuthenticatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleAuthenticatorController],
    }).compile();

    controller = module.get<GoogleAuthenticatorController>(GoogleAuthenticatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
