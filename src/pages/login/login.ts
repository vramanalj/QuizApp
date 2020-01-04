import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';


import { Storage } from '@ionic/storage';
import {SessionServiceProvider} from '../../providers/session-service/session-service';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private authForm : FormGroup;
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  private testClass="thinBorder";
  constructor(public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    private storage: Storage, 
    private sessionService: SessionServiceProvider,
    private toastCtrl: ToastController) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      action: ['login',Validators.required],
    });
    
  }

  logForm(){
    // this.storage.set('sessionDetails',this.authForm.value);
    console.log(JSON.stringify(this.authForm.value));
    if(this.authForm.value.action=='register'){
      this.sessionService.registerUser(this.authForm.value).subscribe(()=>{
        this.sessionService.userEmailID=this.authForm.value.email;
        this.navCtrl.setRoot('QuizzesPage');
      });
    }else if(this.authForm.value.action=='login'){
      this.sessionService.loginService(this.authForm.value.email).subscribe((userData)=>{
        let userDetails=userData.rows[0].doc
        if(userDetails.password==this.authForm.value.password){
          this.sessionService.userEmailID=this.authForm.value.email;
          this.navCtrl.setRoot('QuizzesPage');
        }else{
          let toast = this.toastCtrl.create({
            message: 'Incorrect Password',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      },(error)=>{
        let toast = this.toastCtrl.create({
          message: 'User Not Registered',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    }
    // this.sessionService.createSession(this.authForm.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.sendMessage();
  }

   sendMessage(){
    navigator.serviceWorker.addEventListener('fetch', async(e) => {
      self.window.postMessage(
        "Login Page Loaded: From Service Worker",'*'
      );
    });
  }

}
