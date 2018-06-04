import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import * as moment from 'moment';

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
  public alimentosDesayuno = {nombre: ""};
  public alimentosPasabocas: any;
  public hash: string;
  public pb: string;
  public userID: string;
  //public tipo;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
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
    //this.tipo = tipo;
    this.navCtrl.push('BuscarPage', {tipo: input});
    this.menuCtrl.swipeEnable(false);
  }
  getRegistro(data){
    return this.httpProvider.registro(data);
  }
  ngOnInit(){
    // this.storage.get('email').then((val) => {
    //   this.email = val;
    //   this.storage.get('hash').then((val) => {
    //     this.hash = val;
    //     this.storage.get('pb').then((val) => {
    //       this.pb = val;
    //       this.storage.get('userID').then((val) => {
    //         this.userID = val;
    //       }).then(() => {
    //             this.getRegistro({hash: this.hash, pb: this.pb, userID: this.userID, fechaDispositivo: this.currentDate, pag: ''}).subscribe((res: any) => {
    //             if  (res.result != false) {
    //               let caloriasDesayuno = 0;
    //               let caloriasAlmuerzo = 0;
    //               let caloriasCena = 0;
    //               let caloriasPasabocas = 0;
    //               res.forEach(function(element) {
    //                   // if (element.tipo == 'desayuno') caloriasDesayuno += parseInt(element.kc);
    //                   // else if (element.tipo == 'almuerzo') caloriasAlmuerzo += parseInt(element.kc);
    //                   // else if (element.tipo == 'cena') caloriasCena += parseInt(element.kc);
    //                   // else if (element.tipo == 'pasabocas') caloriasPasabocas += parseInt(element.kc);
    //                   if (moment(element.fecha).week() == moment().week()){
    //                     switch (element.tipo){
    //                       case 'desayuno':
    //                         caloriasDesayuno += parseInt(element.kc);
    //                         break;
    //                       case 'almuerzo':
    //                         caloriasAlmuerzo += parseInt(element.kc);
    //                         break;
    //                       case 'cena':
    //                         caloriasCena += parseInt(element.kc);
    //                         break;
    //                       case 'pasabocas':
    //                         caloriasPasabocas += parseInt(element.kc);
    //                         break;
    //                     }
    //                   }
    //                 });
    //               this.caloriasDesayuno = caloriasDesayuno;
    //               this.caloriasAlmuerzo = caloriasAlmuerzo;
    //               this.caloriasCena = caloriasCena;
    //               this.caloriasPasabocas = caloriasPasabocas;
    //               this.caloriasDiarias = true;
    //             }
    //             else this.caloriasDiarias = res.result;
    //             }, (err) => {
    //               console.log(err);
    //             });
    //         });
    //     });
    //   });
    // });
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
                  let alimentosAlmuerzo: any;
                  let alimentosCena: any;
                  let alimentosDesayuno = {nombre: ""};
                  let alimentosPasabocas: any;
                  res.forEach(function(element) {
                      if (moment(element.fecha).week() == moment().week()){
                        switch (element.tipo){
                          case 'desayuno':
                            caloriasDesayuno += parseInt(element.kc);
                            alimentosDesayuno['nombre'] = element.nombre; // Obtener nombre de los alimentos del desayuno.
                            break;
                          case 'almuerzo':
                            caloriasAlmuerzo += parseInt(element.kc);

                            break;
                          case 'cena':
                            caloriasCena += parseInt(element.kc);

                            break;
                          case 'pasabocas':
                            caloriasPasabocas += parseInt(element.kc);

                            break;
                        }
                      }
                    });
                  this.caloriasDesayuno = caloriasDesayuno;
                  this.caloriasAlmuerzo = caloriasAlmuerzo;
                  this.caloriasCena = caloriasCena;
                  this.caloriasPasabocas = caloriasPasabocas;

                  this.alimentosDesayuno = alimentosDesayuno;
                  // this.alimentosAlmuerzo = JSON.parse(alimentosAlmuerzo);
                  // this.alimentosCena = JSON.parse(alimentosCena);
                  // this.alimentosPasabocas = JSON.parse(alimentosPasabocas);

                  this.caloriasDiarias = true;
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
