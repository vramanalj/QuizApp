import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';


// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';


import {SessionServiceProvider} from '../providers/session-service/session-service';
import {Observable} from 'rxjs/Rx';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  dbTable;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private sessionService: SessionServiceProvider, private translate:TranslateService) {
    this.initializeApp(translate);

    // this.sessionService.getTables();
    // this.sessionService.getDocs();
    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Quizzes', component: 'QuizzesPage' },
      {title: 'Features', component: 'FeaturesPage'},
      { title: 'LogOut', component: 'LoginPage' }
    ];

  }

  initializeApp(translate) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
           
      translate.addLangs(["en", "fr"]);
      translate.setDefaultLang('en');

      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
