import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlimentoPage } from './alimento';

@NgModule({
  declarations: [
    AlimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlimentoPage),
  ],
})
export class AlimentoPageModule {}
