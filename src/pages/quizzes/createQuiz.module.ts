import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQuizPage } from './createQuiz';

@NgModule({
  declarations: [
    CreateQuizPage
  ],
  imports: [
    IonicPageModule.forChild(CreateQuizPage),
  ],
})
export class CreateQuizPageModule {}
