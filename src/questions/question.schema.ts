import { Schema, Document } from 'mongoose';

export interface Question extends Document {
  text: string; // Texte de la question
  options?: string[]; // Propositions de réponse (optionnelles)
}

export const QuestionSchema = new Schema<Question>({
  text: { type: String, required: true }, // La question elle-même
  options: { type: [String], required: false }, // Les options de réponse, si elles existent
});

