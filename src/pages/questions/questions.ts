import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';
import {SessionServiceProvider} from '../../providers/session-service/session-service'



/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  userDetails:any;
  sessionDetails:any;
  questions:any;
  userPersona:String;

  constructor(public navCtrl: NavController, private storage: Storage, private modalCtrl:ModalController,private navParams: NavParams,private sessionService: SessionServiceProvider) {

    let quizQuestionsData=navParams.get('quizQuestionsData');
    this.questions = quizQuestionsData.questions;

  }

  radioOrCheckBox(answerOptions){
    let correctAnswers = answerOptions.filter(i => i.isAnswer === true);
    let controlType=correctAnswers.length>1?"checkbox":"radio";
    return controlType;
  }

  openModal(editQuestionDetails) {
    console.log(editQuestionDetails);
    let modal = this.modalCtrl.create('CreateQuestionPage',{questionDetails: editQuestionDetails});
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  deleteQuestion(index){
    this.questions.splice(index,1);
  }

}
