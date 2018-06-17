import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiarioPage } from './diario';

@NgModule({
  declarations: [
    //DiarioPage, 
  ],
  imports: [
    IonicPageModule.forChild(DiarioPage),
  ],
})
export class DiarioPageModule {}
