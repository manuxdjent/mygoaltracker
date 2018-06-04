import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the InformesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informes',
  templateUrl: 'informes.html',
})
export class InformesPage {

  @ViewChild('barCanvas') barCanvas;

  barChart: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  }

  ionViewDidLoad() {

         this.barChart = new Chart(this.barCanvas.nativeElement, {

             type: 'bar',
             data: {
                 labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                 datasets: [{
                     label: '# of Votes',
                     data: [12, 19, 3, 5, 2, 3],
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
                 }
             }

         });

 }

}
