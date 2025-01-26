import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './question.schema';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // Créer une nouvelle question
  @Post()
  async create(@Body() createQuestionDto: { text: string; options?: string[] }): Promise<Question> {
    return this.questionsService.createQuestion(createQuestionDto.text, createQuestionDto.options);
  }

  // Récupérer toutes les questions
  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }

  // Récupérer une question par ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.questionsService.getQuestionById(id);
  }

  // Mettre à jour une question
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateQuestionDto: { text: string; options?: string[] }): Promise<Question> {
    return this.questionsService.updateQuestion(id, updateQuestionDto.text, updateQuestionDto.options);
  }

  // Supprimer une question
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Question> {
    return this.questionsService.deleteQuestion(id);
  }
}
