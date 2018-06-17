import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('pieCanvas') pieCanvas;

  public lineChart: any;
  public pieChart: any;
  private email;
  public currentDate;
  public hash: string;
  public pb: string;
  public userID: string;
  public loaded = false;
  public dias = {
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0,
    sabado: 0,
    domingo: 0
  };
  public tipo = {
    desayuno: 0,
    almuerzo: 0,
    cena: 0,
    pasabocas: 0
  };
  public caloriasDiarias;
  public caloriasSemana;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpProvider : HttpProvider,
    public storage: Storage) {
  }

  getRegistro(data){
    return this.httpProvider.registro(data);
  }

  ionViewDidLoad() {
      moment.locale('es');
        this.storage.get('email').then((val) => {
          this.email = val;
          this.storage.get('hash').then((val) => {
            this.hash = val;
            this.storage.get('pb').then((val) => {
              this.pb = val;
              this.storage.get('userID').then((val) => {
                this.userID = val;
              }).then(() => {
                    this.getRegistro({hash: this.hash, pb: this.pb, userID: this.userID, fechaDispositivo: '', pag: 'stats'}).subscribe((res: any) => {
                    if  (res.result != false) {
                      let caloriasDiarias = 0;
                      let caloriasSemana = 0;
                      let dias = {
                        lunes: 0,
                        martes: 0,
                        miercoles: 0,
                        jueves: 0,
                        viernes: 0,
                        sabado: 0,
                        domingo: 0
                      };
                      let tipo = {
                        desayuno: 0,
                        almuerzo: 0,
                        cena: 0,
                        pasabocas: 0
                      };
                      res.forEach(function(element) {

                        if (moment(element.fecha).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                          caloriasDiarias += parseInt(element.kc);
                          switch (element.tipo){
                            case 'desayuno':
                             tipo['desayuno'] += parseInt(element.kc);
                             break;
                            case 'almuerzo':
                            tipo['almuerzo'] += parseInt(element.kc);
                            break;
                            case 'cena':
                             tipo['cena'] += parseInt(element.kc);
                             break;
                            case 'pasabocas':
                            tipo['pasabocas'] += parseInt(element.kc);
                            break;
                          }
                        }
                        if (moment(element.fecha).week() == moment().week()){
                          console.log(moment(element.fecha).day());
                          caloriasSemana += parseInt(element.kc);
                          switch (moment(element.fecha).day()){
                            case 1:
                              dias['lunes'] += parseInt(element.kc);
                              break;
                            case 2:
                              dias['martes'] += parseInt(element.kc);
                              break;
                            case 3:
                              dias['miercoles'] += parseInt(element.kc);
                              break;
                            case 4:
                              dias['jueves'] += parseInt(element.kc);
                              break;
                            case 5:
                              dias['viernes'] += parseInt(element.kc);
                              break;
                            case 6:
                              dias['sabado'] += parseInt(element.kc);
                              break;
                            case 0:
                              dias['domingo'] += parseInt(element.kc);
                              break;
                          }
                        }
                        });
                      this.caloriasDiarias = caloriasDiarias;
                      this.caloriasSemana = caloriasSemana;
                      this.dias = dias;
                      this.tipo = tipo;
                      //console.log(this.dias);
                      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

                          type: 'bar',
                          data: {
                              labels: ["L", "M", "X", "J", "V", "S", "D"],
                              datasets: [{
                                  label: 'Calorias',
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
                      this.pieChart = new Chart(this.pieCanvas.nativeElement, {

                          type: 'pie',
                          data: {
                              labels: ["Desayuno", "Almuerzo", "Cena", "Pasa bocas"],
                              datasets: [{
                                  label: 'Calorias',
                                  data: [this.tipo.desayuno, this.tipo.almuerzo, this.tipo.cena, this.tipo.pasabocas],
                                  backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(200, 255, 112, 0.2)'
                                  ],
                                  borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(200, 255, 112, 1)'
                                  ],
                                  borderWidth: 1
                              }]
                          },
                          options: {
                            tooltips: {
                              enabled: true
                            },
                              legend: { display: false }
                          }
                      });
                    }

                    else {
                      this.caloriasSemana = 0;
                      this.caloriasDiarias = 0;
                      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

                          type: 'bar',
                          data: {
                              labels: ["L", "M", "X", "J", "V", "S", "D"],
                              datasets: [{
                                  label: 'Calorias',
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
                      this.pieChart = new Chart(this.pieCanvas.nativeElement, {

                          type: 'pie',
                          data: {
                              labels: ["Desayuno", "Almuerzo", "Cena", "Pasa bocas"],
                              datasets: [{
                                  label: 'Calorias',
                                  data: [0,0,0,0],
                                  backgroundColor: [
                                      '#f4433685',
                                      '#00968885',
                                      '#4caf5085',
                                      '#e91e6385'
                                  ],
                                  borderColor: [
                                    '#f4433685',
                                    '#f4433685',
                                    '#f4433685',
                                    '#f44336'
                                  ],
                                  borderWidth: 0
                              }]
                          },
                          options: {
                            tooltips: {
                              enabled: true
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
