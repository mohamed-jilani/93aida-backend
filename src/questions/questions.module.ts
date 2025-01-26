import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question, QuestionSchema } from './question.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }])],  // Le nom doit correspondre
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
