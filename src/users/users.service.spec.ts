import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Types } from 'mongoose';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });
  it('should find a user by email', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
    jest.spyOn(userModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    } as any);
  
    const result = await usersService.findOneByEmail('test@example.com');
    expect(result).toEqual(mockUser);
    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

/*
  it('should create a new user', async () => {
  const mockUser = { email: 'test@example.com', password: 'hashedpassword', role: 'user' };

  // Créez un mock pour la méthode save
  const mockSave = jest.fn().mockResolvedValue(mockUser);

  // Mock la méthode create pour qu'elle retourne une promesse avec l'utilisateur créé
  jest.spyOn(userModel, 'create').mockResolvedValue([
    {
      ...mockUser,  // On utilise le spread sur mockUser
      save: mockSave, // Ajout de la méthode save simulée
    } as any, // Le type any est utilisé pour contourner la vérification stricte de TypeScript
  ]);

  // Test
  const result = await usersService.createUser(mockUser.email, mockUser.password, mockUser.role);
  expect(result).toEqual(mockUser);
  expect(userModel.create).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: expect.any(String), // Vérifie que le mot de passe est bien hashé
    role: 'user',
  });
});
*/

  
  
});
