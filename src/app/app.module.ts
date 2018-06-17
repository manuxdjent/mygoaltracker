import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage  } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { LandingPage } from '../pages/landing/landing';
import { DiarioPage } from '../pages/diario/diario';
import { StatsPage } from '../pages/stats/stats';
import { PesoStatsPage } from '../pages/peso-stats/peso-stats';
import { BuscarPage } from '../pages/buscar/buscar';


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
    StatsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    BuscarPage,
    LandingPage,
    //InformesPage,
    DiarioPage,
    PesoStatsPage
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
    WelcomePage,
    LoginPage,
    SignupPage,
    BuscarPage,
    StatsPage,
    LandingPage,
    //InformesPage,
    DiarioPage,
    PesoStatsPage
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
