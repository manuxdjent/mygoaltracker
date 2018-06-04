import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {
  public alimentos: any;
  public input: string = "";
  public email;
  public hash;
  public pb;
  public userID;
  public tipo;
  public currentDate;
  public caloriasDesayuno;
  public caloriasAlmuerzo;
  public caloriasCena;
  public caloriasPasabocas;
  public caloriasDiarias;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private alertCtrl: AlertController,
    private httpProvider : HttpProvider,
    public storage: Storage) {
    this.tipo = navParams.get('tipo');
    this.currentDate = moment().format("YYYY-MM-DD");

  }
  getAlimentos(data){
    return this.httpProvider.alimentos(data);
  }
  postRegistro(data,headersData){
    return this.httpProvider.postRegistro(data,headersData);
  }
  openAlimento(alimento){
    //console.log(this.tipo);
    // this.navCtrl.push('AlimentoPage',alimento);
    // this.menu.swipeEnable(false);
    let alert = this.alertCtrl.create({
      title: 'Añadir',
      message:  "<h4>" + alimento.nombre + "</h4>" +
      "<br><strong>Calorias: </strong>" +  alimento.calorias +
      "<br><strong>Proteinas: </strong>" +  alimento.proteinas +
      "<br><strong>Carbohidratos: </strong>" +  alimento.ch +
      "<br><strong>Grasas: </strong>" +  alimento.grasas,
      cssClass: 'alertAlimento',
      inputs: [
        {
          name: 'cantidad',
          placeholder: 'Cantidad en gramos...',
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
            //console.log(this.tipo);
            this.postRegistro(data,{hash: this.hash, pb: this.pb, userID: this.userID, fechaDispositivo: this.currentDate, tipo: this.tipo, caloriasAlimento: alimento.calorias}).subscribe((res: any) => {
              
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }
  onInput(searchbar){
    if (searchbar.srcElement.value != undefined){
      this.input = searchbar.srcElement.value;
      if (this.input.length != 0){
        this.storage.get('email').then((val) => {
          this.email = val;
          this.storage.get('hash').then((val) => {
            this.hash = val;
            this.storage.get('pb').then((val) => {
              this.pb = val;
              this.storage.get('userID').then((val) => {
                this.userID = val;
              }).then(() => {
                  this.getAlimentos({hash: this.hash, pb: this.pb, userID: this.userID,input: this.input}).subscribe((res: any) => {
                  if  (res.result != false) {
                    this.alimentos = res;
                  }
                  else {
                    this.alimentos = res.result;
                  }
                  }, (err) => {
                    console.log(err);
                  });
                });
            });
          });
        });
      } else this.alimentos = false;
    } else this.alimentos = false;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
    //console.log(this.tipo);

  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }
}
