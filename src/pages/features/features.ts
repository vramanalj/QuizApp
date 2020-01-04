import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeaturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare global {
  interface Window { PaymentRequest: any; }
}

@IonicPage()
@Component({
  selector: 'page-features',
  templateUrl: 'features.html',
})
export class FeaturesPage {
  
  private locationCoordinates : String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  makePayment(amount){

    const supportedInstruments = [{
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex',
          'jcb', 'diners', 'discover', 'mir', 'unionpay']
      }
    }];

    let details = {
      total: {
        label: 'Total due',
        amount: {currency: 'INR', value: String(amount)}
      }
    };
    if (window.PaymentRequest) {
      let request = new PaymentRequest(supportedInstruments, details);
      request.show();
    } else {
      // Alas! Use your legacy checkout form...
    }
  }

  displayNotification(){
    Notification.requestPermission((status)=>{
      console.log('Notification permission status:', status);
      console.log('Notification permission status:', status);
    navigator.serviceWorker.ready.then((reg) =>{
      console.log(reg);
      reg.showNotification('Hello world!').then(
        ()=>console.log("Push Success!"),
        ()=>console.log("Push Failure")
      );
    },()=>()=>console.log("Service Worker not Available") );
    });
  }


  getLocation() {
    var startPos;
    var geoOptions = {
       timeout: 10 * 1000
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      this.locationCoordinates=position.coords.latitude+","+position.coords.latitude;
    }, (error)=>{
      console.log('Error occurred. Error code: ' + error.code);
    }, geoOptions);
  };

}
