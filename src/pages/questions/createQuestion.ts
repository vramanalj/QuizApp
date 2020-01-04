import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector:"create-question",
  templateUrl: "create-question.html"
})
export class CreateQuestionPage{

  private newQuestionForm : FormGroup;
  private questionVal : any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,params: NavParams){
    let editQuestion=params.get('questionDetails');
    this.questionVal={
      'question':'',
      'answerOptions':[{
        'value':'',
        'isAnswer':false
      },{
        'value':'',
        'isAnswer':false
      },{
        'value':'',
        'isAnswer':false
      },{
        'value':'',
        'isAnswer':false
      }]
    }
    if(editQuestion){
      this.questionVal.question=editQuestion.question;
      this.questionVal.answerOptions=editQuestion.answerOptions;
    }
    this.newQuestionForm = this.formBuilder.group({
      question: [this.questionVal.question, Validators.required],
      option1: [this.questionVal.answerOptions[0].value, Validators.required],
      option2: [this.questionVal.answerOptions[1].value,Validators.required],
      option3: [this.questionVal.answerOptions[2].value],
      option4:[this.questionVal.answerOptions[3].value],
      answer1:[this.questionVal.answerOptions[0].isAnswer],
      answer2:[this.questionVal.answerOptions[1].isAnswer],
      answer3:[this.questionVal.answerOptions[2].isAnswer],
      answer4:[this.questionVal.answerOptions[3].isAnswer]
    });
  }
  dismiss() {
    this.navCtrl.pop();
  }

  answerCount(){
    let formValues=this.newQuestionForm.value;
    let answers=Object.keys(formValues).filter(formValue=>formValues[formValue]==true);

    // let answers=this.newQuestionForm.value.map(i => i.isAnswer === true);
    if(answers.length>0){
      return false;
    }else{
      return true;
    }

  }

  ionViewDidLoad() {
    console.log('Loaded Create Question Modal');
  }

}