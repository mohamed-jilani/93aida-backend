import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question, QuestionSchema } from './question.schema';
import { CategoryModule } from 'src/category/categories.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
  CategoryModule 
  ],  
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [MongooseModule], 

})
export class QuestionsModule {}
