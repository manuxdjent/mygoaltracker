import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DiarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diario',
  templateUrl: 'diario.html',
})

export class DiarioPage {
  private email;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public storage: Storage) {
    this.storage.get('email').then((val) => {
      this.email = val;
    });

  }
  // toggleMenu() {
  //  this.menuCtrl.toggle();
  // }

}
