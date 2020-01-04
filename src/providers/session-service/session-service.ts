import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServiceCallProvider} from '../service-call/service-call';


/*
  Generated class for the SessionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionServiceProvider {

  userEmailID:String;

  constructor(public http: HttpClient,private serviceCall:ServiceCallProvider) {
    console.log('Hello SessionServiceProvider Provider');
  }

  registerUser(loginFormData){
      return this.serviceCall.postService('/sessionusers',JSON.stringify({
        "_id":loginFormData.email,
        "password":loginFormData.password
      }));
  }

  loginService(email){
      return this.serviceCall.getService('/sessionusers/_all_docs?keys=[\"'+email+'\"]&include_docs=true');
  }

}
