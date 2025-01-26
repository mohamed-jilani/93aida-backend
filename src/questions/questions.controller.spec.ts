import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  let questionsService: Partial<QuestionsService>;

  beforeEach(async () => {
    questionsService = {
      createQuestion: jest.fn().mockResolvedValue({ text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] }),
      getAllQuestions: jest.fn().mockResolvedValue([
        { text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] },
        { text: 'What is the color of the sky?', options: ['Blue', 'Green', 'Red'] }
      ]),
      getQuestionById: jest.fn().mockResolvedValue({ text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] }),
      updateQuestion: jest.fn().mockResolvedValue({ text: 'What is the capital of Germany?', options: ['Berlin', 'Paris', 'Rome'] }),
      deleteQuestion: jest.fn().mockResolvedValue({ text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        {
          provide: QuestionsService,
          useValue: questionsService,
        },
      ],
    }).compile();

    questionsController = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(questionsController).toBeDefined();
  });

  it('should create a new question', async () => {
    const result = await questionsController.create({ text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] });
    expect(result).toEqual({ text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] });
    expect(questionsService.createQuestion).toHaveBeenCalledWith('What is the capital of France?', ['Paris', 'Berlin', 'Rome']);
  });

  it('should get all questions', async () => {
    const result = await questionsController.findAll();
    expect(result).toEqual([
      { text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] },
      { text: 'What is the color of the sky?', options: ['Blue', 'Green', 'Red'] }
    ]);
    expect(questionsService.getAllQuestions).toHaveBeenCalled();
  });

  it('should get a question by id', async () => {
    const result = await questionsController.findOne('1');
    expect(result).toEqual({ text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] });
    expect(questionsService.getQuestionById).toHaveBeenCalledWith('1');
  });

  it('should update a question', async () => {
    const result = await questionsController.update('1', { text: 'What is the capital of Germany?', options: ['Berlin', 'Paris', 'Rome'] });
    expect(result).toEqual({ text: 'What is the capital of Germany?', options: ['Berlin', 'Paris', 'Rome'] });
    expect(questionsService.updateQuestion).toHaveBeenCalledWith('1', 'What is the capital of Germany?', ['Berlin', 'Paris', 'Rome']);
  });

  it('should delete a question', async () => {
    const result = await questionsController.remove('1');
    expect(result).toEqual({ text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Rome'] });
    expect(questionsService.deleteQuestion).toHaveBeenCalledWith('1');
  });
});
