import { Directive, Input, ElementRef, Injectable  } from '@angular/core';
import {ServiceCallProvider} from '../../providers/service-call/service-call';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'

import { Observable } from 'rxjs';

/**
 * Generated class for the ImgSecureSrcComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Directive({
  selector: '[img-secure-src]'
})

export class ImgSecureSrcComponent {

  @Input('img-secure-src') secureURL: string;

  constructor(public http: HttpClient,private serviceCall: ServiceCallProvider,
    el: ElementRef,  private domSanitizer: DomSanitizer) {
    console.log('Hello ImgSecureSrcComponent Component');
  }

  ngOnInit() {
    console.log('URL string: '+this.secureURL);  
    this.serviceCall.getSecureImage(this.secureURL, {responseType: 'blob'})
    .subscribe(e => {
      let imgObjectURL=this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e));
      console.log(imgObjectURL);
    })
  }
}


