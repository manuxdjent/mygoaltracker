import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
//import { MenusPage } from '../menus/menus';

import { DiarioPage } from '../diario/diario';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  public email: string;
  public userID: string;
  public peso: any;
  public caloriasDiarias;
  public hash: string;
  public pb: string;
  public currentDate;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private httpProvider : HttpProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private menu: MenuController) {
      this.menu.swipeEnable(true);
      //this.getFecha();
      this.currentDate = moment().format("YYYY-MM-DD");
  }

  // getFecha(){
  //   var dateObj = new Date();
  //   var year = dateObj.getFullYear().toString();
  //   if (dateObj.getMonth() + 1 < 10) var month = dateObj.getMonth() + 1;
  //   else var month = dateObj.getMonth() + 1;
  //   var date = dateObj.getDate().toString();
  //   this.currentDate = year + '-' + month.toString() + '-' + date;
  // }

  abrirPagina(){this.navCtrl.setRoot(DiarioPage);}
  getPeso(data){
    return this.httpProvider.peso(data);
  }
  getRegistro(data){
    return this.httpProvider.registro(data);
  }

  postPeso(data,headersData){
    return this.httpProvider.postPeso(data,headersData);
  }
presentIntroducirPeso() {
  let alert = this.alertCtrl.create({
    title: 'Peso inicial',
    inputs: [
      {
        name: 'peso',
        placeholder: 'Introduce tu peso en kg...',
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          this.storage.get('email').then((val) => {
            this.email = val;
            this.storage.get('hash').then((val) => {
              this.hash = val;
              this.storage.get('pb').then((val) => {
                this.pb = val;
                this.storage.get('userID').then((val) => {
                  this.userID = val;
                }).then(() => {
                    this.postPeso(data,{hash: this.hash, pb: this.pb, userID: this.userID}).subscribe((res: any) => {
                      this.getPeso({hash: this.hash, pb: this.pb, userID: this.userID}).subscribe((res: any) => {
                      if  (res.result != false) {
                        this.peso = res[0];
                      }
                      else this.peso = res.result;
                      }, (err) => {
                        console.log(err);
                      });
                    }, (err) => {
                      console.log(err);
                    });
                  });
              });
            });
          });
        }
      }
    ]
  });
  alert.present();
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
            this.getPeso({hash: this.hash, pb: this.pb, userID: this.userID}).subscribe((res: any) => {
            if  (res.result != false) {
              this.peso = res[0]; // Se obtiene el útlimo peso.
              //console.log(this.peso);
            }
            else this.peso = res.result;
            }, (err) => {
              console.log(err);
            });
              this.getRegistro({hash: this.hash, pb: this.pb, userID: this.userID, fechaDispositivo: this.currentDate, pag: 'landing'}).subscribe((res: any) => {
              if  (res.result != false) {
                let caloriasDiarias = 0;
                res.forEach(function(element) {
                    caloriasDiarias += parseInt(element.kc);
                  });
                this.caloriasDiarias = caloriasDiarias;
              }
              else this.caloriasDiarias = res.result;
              }, (err) => {
                console.log(err);
          });
      });
    });
  });
});
}
}
