import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import * as moment from 'moment';
import { BuscarPage } from '../buscar/buscar';

@IonicPage()
@Component({
  selector: 'page-diario',
  templateUrl: 'diario.html',
})

export class DiarioPage {
  private email;
  public currentDate;
  public caloriasDesayuno;
  public caloriasAlmuerzo;
  public caloriasCena;
  public caloriasPasabocas;
  public caloriasDiarias;
  public alimentosAlmuerzo: any;
  public alimentosCena: any;
  public alimentosDesayuno: any;
  public alimentosPasabocas: any;
  public hash: string;
  public pb: string;
  public userID: string;
  public loaded = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public storage: Storage,
    private httpProvider : HttpProvider) {
    this.storage.get('email').then((val) => {
      this.email = val;
    });
    this.getFecha();
  }
  getFecha(){
    var dateObj = new Date();
    var year = dateObj.getFullYear().toString();
    if (dateObj.getMonth() + 1 < 10) var month = dateObj.getMonth() + 1;
    else var month = dateObj.getMonth() + 1;
    var date = dateObj.getDate().toString();
    this.currentDate = year + '-' + month.toString() + '-' + date;
  }
  goBuscar(input){
    this.navCtrl.push(BuscarPage, {tipo: input});
    this.menuCtrl.swipeEnable(false);
  }
  getRegistro(data){
    return this.httpProvider.registro(data);
  }
  postRegistro(data,headersData){
    return this.httpProvider.postRegistro(data,headersData);
  }
alimentoEliminadoToast(){
      let toast = this.toastCtrl.create({
        message: "Alimento eliminado.",
        duration: 2000,
        cssClass: "tostadaconmanteca",
        position: 'middle'
      });
      toast.present();
    }

  eliminarAlimento(registroID,nombre){
    let alert = this.alertCtrl.create({
      title: 'Eliminar '+nombre.toLowerCase(),
      message:  "<h4>¿Seguro que quiere eliminarlo?</h4>",
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
            this.postRegistro(data,{hash: this.hash, pb: this.pb, registroID: registroID}).subscribe((res: any) => {
              // console.log(data);
              this.alimentoEliminadoToast();
              this.getRegistro({hash: this.hash, pb: this.pb, userID: this.userID, fechaDispositivo: this.currentDate, pag: ''}).subscribe((res: any) => {
              if  (res.result != false) {
                let caloriasDesayuno = 0;
                let caloriasAlmuerzo = 0;
                let caloriasCena = 0;
                let caloriasPasabocas = 0;
                let alimentosAlmuerzo = [];
                let alimentosCena =  [];
                let alimentosDesayuno =  [];
                let alimentosPasabocas = [];
                res.forEach(function(element) {
                    if (moment(element.fecha).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                      switch (element.tipo){
                        case 'desayuno':
                          caloriasDesayuno += parseInt(element.kc);
                          alimentosDesayuno.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad}); // Obtener nombre de los alimentos del desayuno.
                          break;
                        case 'almuerzo':
                          caloriasAlmuerzo += parseInt(element.kc);
                          alimentosAlmuerzo.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad});
                          break;
                        case 'cena':
                          caloriasCena += parseInt(element.kc);
                          alimentosCena.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad});
                          break;
                        case 'pasabocas':
                          caloriasPasabocas += parseInt(element.kc);
                          alimentosPasabocas.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad});
                          break;
                      }
                    }
                  });
                this.caloriasDesayuno = caloriasDesayuno;
                this.caloriasAlmuerzo = caloriasAlmuerzo;
                this.caloriasCena = caloriasCena;
                this.caloriasPasabocas = caloriasPasabocas;

                this.alimentosDesayuno = alimentosDesayuno;
                this.alimentosAlmuerzo = alimentosAlmuerzo;
                this.alimentosCena = alimentosCena;
                this.alimentosPasabocas = alimentosPasabocas;

                this.caloriasDiarias = true;
                this.loaded = true;
              }
              else this.caloriasDiarias = res.result;
              }, (err) => {
                console.log(err);
              });
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillEnter(){
    console.log("DiarioPage");
    this.storage.get('email').then((val) => {
      this.email = val;
      this.storage.get('hash').then((val) => {
        this.hash = val;
        this.storage.get('pb').then((val) => {
          this.pb = val;
          this.storage.get('userID').then((val) => {
            this.userID = val;
          }).then(() => {
                this.getRegistro({hash: this.hash, pb: this.pb, userID: this.userID, fechaDispositivo: this.currentDate, pag: ''}).subscribe((res: any) => {
                if  (res.result != false) {
                  let caloriasDesayuno = 0;
                  let caloriasAlmuerzo = 0;
                  let caloriasCena = 0;
                  let caloriasPasabocas = 0;
                  let alimentosAlmuerzo = [];
                  let alimentosCena =  [];
                  let alimentosDesayuno =  [];
                  let alimentosPasabocas = [];
                  res.forEach(function(element) {
                      if (moment(element.fecha).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                        switch (element.tipo){
                          case 'desayuno':
                            caloriasDesayuno += parseInt(element.kc);
                            alimentosDesayuno.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad}); // Obtener nombre de los alimentos del desayuno.
                            break;
                          case 'almuerzo':
                            caloriasAlmuerzo += parseInt(element.kc);
                            alimentosAlmuerzo.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad});
                            break;
                          case 'cena':
                            caloriasCena += parseInt(element.kc);
                            alimentosCena.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad});
                            break;
                          case 'pasabocas':
                            caloriasPasabocas += parseInt(element.kc);
                            alimentosPasabocas.push({'nombre': element.nombre, 'cantidad': element.cantidad, 'registroID' : element.registro_id, 'unidad' : element.unidad});
                            break;
                        }
                      }
                    });
                  this.caloriasDesayuno = caloriasDesayuno;
                  this.caloriasAlmuerzo = caloriasAlmuerzo;
                  this.caloriasCena = caloriasCena;
                  this.caloriasPasabocas = caloriasPasabocas;

                  this.alimentosDesayuno = alimentosDesayuno;
                  this.alimentosAlmuerzo = alimentosAlmuerzo;
                  this.alimentosCena = alimentosCena;
                  this.alimentosPasabocas = alimentosPasabocas;

                  this.caloriasDiarias = true;
                  this.loaded = true;
                }
                else this.caloriasDiarias = res.result; this.loaded = true;
                }, (err) => {
                  console.log(err);
                });

            });
        });
      });
    });
  }
}
