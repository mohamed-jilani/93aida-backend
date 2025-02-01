import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async createCategory(libelle: string, description?: string): Promise<Category> {
    const newCategory = new this.categoryModel({ libelle, description });
    return newCategory.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: string, libelle?: string, description?: string): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      { libelle, description },
      { new: true },
    ).exec();
    
    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) {
      throw new NotFoundException('Category not found');
    }
    return deletedCategory;
  }
}
