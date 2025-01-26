import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.schema';  // L'interface
import { QuestionSchema } from './question.schema';  // Le schéma

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>, 
  ) {}

  // Ajouter une nouvelle question
  async createQuestion(text: string, options?: string[]): Promise<Question> {
    const newQuestion = new this.questionModel({
      text,
      options,
    });
    return newQuestion.save();
  }

  // Récupérer toutes les questions
  async getAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  // Récupérer une question par son ID
  async getQuestionById(id: string): Promise<Question> {
    return this.questionModel.findById(id).exec();
  }

  // Mettre à jour une question
  async updateQuestion(id: string, text: string, options?: string[]): Promise<Question> {
    return this.questionModel.findByIdAndUpdate(id, { text, options }, { new: true }).exec();
  }

  // Supprimer une question
  async deleteQuestion(id: string): Promise<Question> {
    return this.questionModel.findByIdAndDelete(id).exec();
  }
}
