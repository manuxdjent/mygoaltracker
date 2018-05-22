import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  email: string;
  public userID: string;
  public peso: any;
  public hash: string;
  public pb: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    private httpProvider : HttpProvider) {

    //console.log(this.hash);
  }
  // openPage(page){
  //   this.navCtrl.push(page);
  // }
  getPeso(data){
  //console.log("Hash getPeso => "+this.hash);
  // this.httpProvider.peso(data).subscribe((res: any) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });
  return this.httpProvider.peso(data);
}

ngOnInit() {
  this.storage.get('email').then((val) => {
    this.email = val;
    this.storage.get('hash').then((val) => {
      this.hash = val;
      this.storage.get('pb').then((val) => {
        this.pb = val;
        this.storage.get('userID').then((val) => {
          this.userID = val;
        }).then(() => {
            // console.log("Ultimo then => "+this.hash);
            // console.log("Ultimo then => "+this.pb);
            // console.log("Ultimo then => "+this.userID);
            this.getPeso({hash: this.hash, pb: this.pb, userID: this.userID}).subscribe((res: any) => {
              this.peso = res[0];
              console.log("Peso en landing.ts => "+this.peso);
            }, (err) => {
              console.log(err);
            });;

          });
      });
    });
  });
  }
}
