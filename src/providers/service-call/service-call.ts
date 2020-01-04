import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';


declare const webpackGlobalVars: any;

/*
  Generated class for the ServiceCallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceCallProvider {

  public static cloundatConfig = webpackGlobalVars.CLOUDANTDB;
  private credentialstobeEncoded;
  private encodedString;
  private httpOptions;
  public authHeader;


  constructor(public http: HttpClient,public loading: LoadingController) {
    console.log('Hello ServiceCallProvider Provider:'+ServiceCallProvider.cloundatConfig);

    this.credentialstobeEncoded = ServiceCallProvider.cloundatConfig.username + ":" + ServiceCallProvider.cloundatConfig.password;
    // console.log("String to Encode: " + this.credentialstobeEncoded);
    this.encodedString = btoa(this.credentialstobeEncoded);
    // console.log("ENCODED: " + encodedString);
      this.httpOptions= {
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + this.encodedString
        })
    };
  }

  busyLoader;

  getSecureImage(url,options){
    return this.http.get(url,options);
  }

  getService(url) : Observable<any> {
    // this.startBusyLoader();
      let apiURL = ServiceCallProvider.cloundatConfig.url ;
      return this.http.get(apiURL+url,this.httpOptions)
  }

  postService(url, paramsData?): Observable<any> {
    // this.startBusyLoader();
      let apiURL = ServiceCallProvider.cloundatConfig.url ;
      return this.http.post(apiURL+url, JSON.parse(paramsData),this.httpOptions);
  }

  startBusyLoader() {
    this.busyLoader = this.loading.create({
      content: "Please wait..."
    })
  
    this.busyLoader.present();
  }
  stopBusyLoader() {
    this.busyLoader.dismiss().catch(() => {});
  }
}

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  // intercept any http call done by the httpClient
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const requestToHandle = request.clone({
      headers: request.headers.set('authorization', 'Bearer ')
    });
    return next.handle(requestToHandle);

      // return next.handle(request).do((event: HttpEvent<any>) => {
  //   if (event instanceof HttpResponse) {
  //     // do stuff with response if you want
  //   }
  // }, (err: any) => {
  //   if (err instanceof HttpErrorResponse) {
  //     if (err.status === 401) {
  //       // redirect to the login route
  //       // or show a modal
  //     }
  //   }
  // });
  }
} 
