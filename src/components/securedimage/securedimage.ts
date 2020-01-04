import { Component, Input, OnChanges, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ServiceCallProvider} from '../../providers/service-call/service-call';
import { DomSanitizer } from '@angular/platform-browser'
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';



@Component({
  selector: 'secured-image',
  template: `
    <img [src]="dataUrl$|async" [class]="class"/>
  `
})
export class SecuredImage implements OnChanges  {
  // This code block just creates an rxjs stream from the src
  // this makes sure that we can handle source changes
  // or even when the component gets destroyed
  // So basically turn src into src$
  @Input() private src: string;
  @Input() private class: string;
  // private  class$ = new BehaviorSubject(this.class);
  private src$ = new BehaviorSubject(this.src);
  ngOnChanges(): void {
    this.src$.next(this.src);
    // this.class$.next(this.class);
  }

  // this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  dataUrl$ = this.src$.switchMap(url => this.loadImage(url))
  
  // we need HttpClient to load the image
  constructor(private http:HttpClient, private serviceCall : ServiceCallProvider, 
    private domSanitizer: DomSanitizer) {
  }

  private loadImage(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'blob'})
    .map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
  }
}

@Injectable()
export class HeaderAuthInterceptor implements HttpInterceptor {
  // intercept any http call done by the httpClient
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToHandle;
    // if(request.method!="OPTIONS"){
      requestToHandle = request.clone({
        headers: request.headers.set('authorization', 'Bearer <>')
      });
    // }
    return next.handle(requestToHandle);
  }
} 
