import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage  } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
// import { LandingPage } from '../pages/landing/landing';
// import { DiarioPage } from '../pages/diario/diario';
// import { InformesPage } from '../pages/informes/informes';
// import { PesoPage } from '../pages/peso/peso';
//
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpProvider } from '../providers/http/http';
import { Api } from '../providers/api/api';


@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage
    // LandingPage,
    // InformesPage,
    // DiarioPage,
    // PesoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage
    // LandingPage,
    // InformesPage,
    // DiarioPage,
    // PesoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    Api
  ]
})
export class AppModule {}
