import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { HomePage } from '../home/home';
// import { LandingPage } from '../landing/landing';
// import { DiarioPage } from '../diario/diario';
// import { InformesPage } from '../informes/informes';
// import { PesoPage } from '../peso/peso';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = 'LandingPage';
  tab2Root = 'DiarioPage';
  tab3Root = 'InformesPage';
  tab4Root = 'PesoPage';
  myIndex: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
