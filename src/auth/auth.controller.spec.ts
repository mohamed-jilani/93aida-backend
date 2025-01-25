import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'mock-token' }),
            register: jest.fn().mockResolvedValue({ access_token: 'mock-token' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should login a user and return a token', async () => {
    const result = await authController.login({
      email: 'admin@example.com',
      password: 'password123',
    });
  
    expect(result).toEqual({ access_token: 'mock-token' });
    expect(authService.login).toHaveBeenCalledWith('admin@example.com', 'password123');
  });
  
  it('should register a user and return a token', async () => {
    const result = await authController.register({
      email: 'user@example.com',
      password: 'password123',
    });
  
    expect(result).toEqual({ access_token: 'mock-token' });
    expect(authService.register).toHaveBeenCalledWith('user@example.com', 'password123');
  });
  
});
