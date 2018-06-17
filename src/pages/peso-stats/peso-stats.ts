import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-peso-stats',
  templateUrl: 'peso-stats.html',
})
export class PesoStatsPage {

  @ViewChild('lineCanvas') lineCanvas;
  public lineChart: any;
  public pesoDiario;
  public hash: string;
  public pb: string;
  public userID: string;
  public email;
  public dias = {
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0,
    sabado: 0,
    domingo: 0
  };
  public pesoMeta;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpProvider : HttpProvider,
    public menu: MenuController,
    private alertCtrl: AlertController,
    public storage: Storage) {
  }
  getPeso(data){
    return this.httpProvider.peso(data);
  }
  postPesoMeta(data,headersData){
    return this.httpProvider.postPesoMeta(data,headersData);
  }
  presentIntroducirPesoMeta() {
    let alert = this.alertCtrl.create({
      title: 'Cambiar peso meta',
      inputs: [
        {
          name: 'peso',
          placeholder: 'Introduce el peso en kg...',
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
                      this.postPesoMeta(data,{hash: this.hash, pb: this.pb, userID: this.userID}).subscribe((res: any) => {
                        this.getPeso({hash: this.hash, pb: this.pb, userID: this.userID}).subscribe((res: any) => {
                        if  (res.result != false) {
                          this.pesoMeta = res[0].meta;
                        }

                        else this.pesoMeta = res.result;
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
  ionViewDidLoad() {
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
                      this.pesoDiario = res[0].peso;
                      this.pesoMeta = res[0].meta;
                      let pesoMeta = 0;
                      let pesoDiario = 0;
                      let dias = {
                        lunes: 0,
                        martes: 0,
                        miercoles: 0,
                        jueves: 0,
                        viernes: 0,
                        sabado: 0,
                        domingo: 0
                      };
                      res.forEach(function(element) {

                        if (moment(element.fecha).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                          //pesoDiario += parseInt(element.peso);
                        } else pesoDiario = 0;
                        if (moment(element.fecha).week() == moment().week()){
                          switch (moment(element.fecha).day()){
                            case 1:
                              dias['lunes'] += parseInt(element.peso);
                              break;
                            case 2:
                              dias['martes'] += parseInt(element.peso);
                              break;
                            case 3:
                              dias['miercoles'] += parseInt(element.peso);
                              break;
                            case 4:
                              dias['jueves'] += parseInt(element.peso);
                              break;
                            case 5:
                              dias['viernes'] += parseInt(element.peso);
                              break;
                            case 6:
                              dias['sabado'] += parseInt(element.peso);
                              break;
                            case 0:
                              dias['domingo'] += parseInt(element.peso);
                              break;
                          }
                        }
                        });
                      this.dias = dias;
                      //this.pesoDiario = pesoDiario;
                      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

                          type: 'bar',
                          data: {
                              labels: ["L", "M", "X", "J", "V", "S", "D"],
                              datasets: [{
                                  label: 'Peso',
                                  data: [this.dias.lunes, this.dias.martes, this.dias.miercoles, this.dias.jueves, this.dias.viernes, this.dias.sabado, this.dias.domingo],
                                  backgroundColor: [
                                      'rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                  ],
                                  borderColor: [
                                      'rgba(255,99,132,1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                  ],
                                  borderWidth: 1
                              }]
                          },
                          options: {
                              scales: {
                                  yAxes: [{
                                      ticks: {
                                          beginAtZero:true
                                      }
                                  }]
                              },
                              legend: { display: false }
                          }

                      });
                    }
                    else {
                      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

                          type: 'bar',
                          data: {
                              labels: ["L", "M", "X", "J", "V", "S", "D"],
                              datasets: [{
                                  label: 'Peso',
                                  data: [0,0,0,0,0,0,0],
                                  backgroundColor: [
                                      'rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                  ],
                                  borderColor: [
                                      'rgba(255,99,132,1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                  ],
                                  borderWidth: 1
                              }]
                          },
                          options: {
                              scales: {
                                  yAxes: [{
                                      ticks: {
                                          beginAtZero:true
                                      }
                                  }]
                              },
                              legend: { display: false }
                          }
                        });
                      }
                    }, (err) => {
                      console.log(err);
                    });
                });
            });
          });
        });

  }

}
