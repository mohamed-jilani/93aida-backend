import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.schema';  // L'interface
import { Category } from 'src/category/category.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>, 
    @InjectModel('Category') private readonly categoryModel: Model<Category>, 
  ) {}

  // Ajouter une nouvelle question avec ses catégories
  async createQuestion(text: string, options: string[], categoryIds: string[]): Promise<Question> {
    // Vérifier si les catégories envoyées existent
    const categories = await this.categoryModel.find({ _id: { $in: categoryIds } }).exec();
    
    // Vérifier si toutes les catégories existent
    if (categories.length !== categoryIds.length) {
      throw new NotFoundException('Certaines catégories n\'existent pas');
    }

    // Créer la question et associer les catégories
    const newQuestion = new this.questionModel({
      text,
      options,
      categories  // Associer les catégories trouvées
    });

    // Sauvegarder la nouvelle question
    return newQuestion.save();
  }

  // Récupérer toutes les questions
  async getAllQuestions(): Promise<Question[]> {
    // Retourner toutes les questions avec leurs catégories
    return this.questionModel.find().populate('categories').exec();
  }

  // Récupérer une question par son ID
  async getQuestionById(id: string): Promise<Question> {
    // Chercher la question par ID et l'associer avec ses catégories
    const question = await this.questionModel.findById(id).populate('categories').exec();
    if (!question) {
      throw new NotFoundException('Question non trouvée');
    }
    return question;
  }

  // Mettre à jour une question avec de nouvelles catégories
  async updateQuestion(id: string, text: string, options?: string[], categoryIds?: string[]): Promise<Question> {
    // Chercher la question par ID
    const question = await this.questionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException('Question non trouvée');
    }

    // Si des catégories sont envoyées, vérifier qu'elles existent
    if (categoryIds && categoryIds.length > 0) {
      const categories = await this.categoryModel.find({ '_id': { $in: categoryIds } }).exec();
      if (categories.length !== categoryIds.length) {
        throw new NotFoundException('Certaines catégories n\'existent pas');
      }
      // Mettre à jour les catégories
      question.categories = categories.map(category => category._id);
    }

    // Mettre à jour le texte et les options si elles sont définies
    if (text) {
      question.text = text;
    }

    if (options) {
      question.options = options;
    }

    // Mettre à jour la date de mise à jour
    question.updated_at = new Date();

    // Sauvegarder et retourner la question mise à jour
    return question.save();
  }

  // Supprimer une question
  async deleteQuestion(id: string): Promise<Question> {
    // Chercher la question par ID
    const question = await this.questionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException('Question non trouvée');
    }

    // Supprimer la question
    return this.questionModel.findByIdAndDelete(id).exec();
  }
}
