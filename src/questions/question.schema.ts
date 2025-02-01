import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../category/category.schema'; // Assurez-vous que le chemin est correct

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })  // Mongoose va gérer createdAt et updatedAt automatiquement
export class Question {
  @Prop({ required: true })
  text: string;  // Texte de la question

  @Prop({ type: [String], required: false })
  options?: string[];  // Propositions de réponse (optionnelles)

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  categories?: Types.ObjectId[];  // Liste des catégories associées, avec une valeur par défaut vide

  @Prop({ default: Date.now })
  created_at: Date;  // Date de création (si tu souhaites l'avoir en plus du timestamp Mongoose)

  @Prop({ default: Date.now })
  updated_at: Date;  // Date de mise à jour (même chose ici si tu veux le garder en plus de `timestamps`)
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
