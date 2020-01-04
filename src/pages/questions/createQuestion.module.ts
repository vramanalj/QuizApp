import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQuestionPage } from './createQuestion';

@NgModule({
  declarations: [
    CreateQuestionPage
  ],
  imports: [
    IonicPageModule.forChild(CreateQuestionPage),
  ],
})
export class CreateQuestionPageModule {}
