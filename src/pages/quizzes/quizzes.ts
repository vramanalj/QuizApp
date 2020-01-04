import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';
import {SessionServiceProvider} from '../../providers/session-service/session-service'



/**
 * Generated class for the QuizzesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quizzes',
  templateUrl: 'quizzes.html',
})
export class QuizzesPage {

  private quizData;
  private sessionDetails;
  private userPersona;

  constructor(public navCtrl: NavController, private storage: Storage, private modalCtrl:ModalController, private sessionService:SessionServiceProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizzesPage');
  }

  openQuiz(quiz){
    this.navCtrl.push('QuestionsPage',{
      quizQuestionsData:quiz
    });
  }



}
