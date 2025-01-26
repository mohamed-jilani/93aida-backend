import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Question } from './question.schema';
import { Model } from 'mongoose';

describe('QuestionsService', () => {
  let questionsService: QuestionsService;
  let questionModel: Model<Question>;

  beforeEach(async () => {
    // Simulation du modèle Mongoose avec une classe constructeur
    const mockQuestionModel = {
      new: jest.fn().mockImplementation((data) => ({
        save: jest.fn().mockResolvedValue({ ...data, _id: '1' }), // Simule un enregistrement
      })),
      create: jest.fn(),
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([]), // Mock exec pour find
      }),
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null), // Mock exec pour findById
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
      findByIdAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getModelToken('Question'), // Assurez-vous d'utiliser le bon nom ici
          useValue: mockQuestionModel, // Utiliser le modèle mocké
        },
      ],
    }).compile();

    questionsService = module.get<QuestionsService>(QuestionsService);
    questionModel = module.get<Model<Question>>(getModelToken('Question'));
  });


  it('should get all questions', async () => {
    const mockQuestions = [
      { text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] },
      { text: 'What is the capital of Germany?', options: ['Berlin', 'Paris', 'Madrid'] },
    ];
    const mockQuery: any = {
      exec: jest.fn().mockResolvedValue(mockQuestions), // Mock exec pour find
    };
    jest.spyOn(questionModel, 'find').mockReturnValue(mockQuery as any);

    const result = await questionsService.getAllQuestions();
    expect(result).toEqual(mockQuestions);
    expect(questionModel.find).toHaveBeenCalled();
  });

  it('should get a question by id', async () => {
    const mockQuestion = { text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] };
    const mockQuery: any = {
      exec: jest.fn().mockResolvedValue(mockQuestion), // Mock exec pour findById
    };
    jest.spyOn(questionModel, 'findById').mockReturnValue(mockQuery as any);

    const result = await questionsService.getQuestionById('1');
    expect(result).toEqual(mockQuestion);
    expect(questionModel.findById).toHaveBeenCalledWith('1');
  });

  it('should update a question', async () => {
    const mockQuestion = { text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] };
    const mockQuery: any = {
      exec: jest.fn().mockResolvedValue(mockQuestion), // Mock exec pour findByIdAndUpdate
    };
    jest.spyOn(questionModel, 'findByIdAndUpdate').mockReturnValue(mockQuery as any);

    const result = await questionsService.updateQuestion('1', 'New question text', ['Paris', 'Berlin', 'Rome']);
    expect(result).toEqual(mockQuestion);
    expect(questionModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { text: 'New question text', options: ['Paris', 'Berlin', 'Rome'] },
      { new: true },
    );
  });

  it('should delete a question', async () => {
    const mockQuestion = { text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] };
    const mockQuery: any = {
      exec: jest.fn().mockResolvedValue(mockQuestion), // Mock exec pour findByIdAndDelete
    };
    jest.spyOn(questionModel, 'findByIdAndDelete').mockReturnValue(mockQuery as any);

    const result = await questionsService.deleteQuestion('1');
    expect(result).toEqual(mockQuestion);
    expect(questionModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
