import { NgModule } from '@angular/core';
import { SecuredImage } from './securedimage/securedimage';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [SecuredImage],
	imports: [IonicModule],
	exports: [SecuredImage]
})
export class ComponentsModule {}
