import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { LandingPage } from '../pages/landing/landing';
import { DiarioPage } from '../pages/diario/diario';
import { InformesPage } from '../pages/informes/informes';
import { PesoPage } from '../pages/peso/peso';

//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //@ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;

  //pages: Array<{title: string, component: any}>;


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
  // openPage(page) {
  //   console.log(page);
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    statusBar.styleDefault();
    splashScreen.hide();
  });
}
}
