import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let model: Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    model = module.get<Model<Category>>(getModelToken(Category.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
