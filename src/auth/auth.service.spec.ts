import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate a user and return a JWT token', async () => {
    const mockUser = {
      _id: '1',
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'admin',
      createdAt: new Date(),
    };

    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(mockUser);

    const result = await authService.login('admin@example.com', 'password123');

    expect(result).toEqual({ access_token: 'mock-jwt-token' });
    expect(usersService.findOneByEmail).toHaveBeenCalledWith('admin@example.com');
  });

  it('should throw an error for invalid credentials', async () => {
    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);
  
    await expect(
      authService.login('nonexistent@example.com', 'wrong-password'),
    ).rejects.toThrow('Invalid credentials');
  });
  
});
