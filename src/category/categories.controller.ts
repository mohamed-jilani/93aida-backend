import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { Category } from './category.schema';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Créer une nouvelle catégorie.
   * @param body Contient `libelle` (obligatoire) et `description` (facultative).
   * @returns La catégorie créée.
   */
  @Post()
  async createCategory(
    @Body() body: { libelle: string; description?: string },
  ): Promise<Category> {
    return this.categoriesService.createCategory(body.libelle, body.description);
  }

  /**
   * Récupérer toutes les catégories.
   * @returns La liste de toutes les catégories.
   */
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  /**
   * Récupérer une catégorie par son ID.
   * @param id L'ID de la catégorie à récupérer.
   * @returns La catégorie trouvée.
   */
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }

  /**
   * Mettre à jour une catégorie.
   * @param id L'ID de la catégorie à mettre à jour.
   * @param body Contient les champs à mettre à jour, `libelle` et `description` sont facultatifs.
   * @returns La catégorie mise à jour.
   */
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: { libelle?: string; description?: string },
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, body.libelle, body.description);
  }

  /**
   * Supprimer une catégorie par son ID.
   * @param id L'ID de la catégorie à supprimer.
   * @returns La catégorie supprimée.
   */
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
