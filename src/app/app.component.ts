import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { LandingPage } from '../pages/landing/landing';
import { DiarioPage } from '../pages/diario/diario';
import { StatsPage } from '../pages/stats/stats';
import { PesoStatsPage } from '../pages/peso-stats/peso-stats';

//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //@ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;
  platform: Platform;
  statusBar: StatusBar;
  splashScreen: SplashScreen;
  pages: Array<{title: string, component: any, icon: string}>;


  // constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  //   platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.pages = [
      // { title: 'Inicio', component: LandingPage },
      // { title: 'Diario', component: DiarioPage },
      // { title: 'Informes', component: InformesPage },
      // { title: 'Peso', component: PesoPage }
  //   ];
  //     statusBar.styleDefault();
  //     splashScreen.hide();
  //   });
  //
  // }
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { title: 'Inicio', component: LandingPage , icon: "home"},
      { title: 'Diario', component: DiarioPage , icon: "calendar"},
      { title: 'Informes', component: StatsPage , icon: "stats"},
      { title: 'Peso', component: PesoStatsPage , icon: "disc"},
      { title: 'Salir', component: WelcomePage , icon: "contact"}
    ];

}
initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });
}
openPage(page) {
  this.nav.setRoot(page.component);
}
}
