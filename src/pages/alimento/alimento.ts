import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the AlimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alimento',
  templateUrl: 'alimento.html',
})
export class AlimentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentoPage');

  }
  ionViewWillLeave(){
    this.menu.swipeEnable(false);
  }
}
