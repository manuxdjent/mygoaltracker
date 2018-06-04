import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu : MenuController) {

  }

  login(){this.navCtrl.push(LoginPage); this.menu.swipeEnable(false);}
  signup(){this.navCtrl.push(SignupPage); this.menu.swipeEnable(false);}

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad WelcomePage');
  }

}
