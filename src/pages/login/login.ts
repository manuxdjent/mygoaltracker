import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpProvider } from '../../providers/http/http';
import { LandingPage } from '../landing/landing';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private myForm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    private httpProvider : HttpProvider,
    private toastCtrl: ToastController,
    private menu: MenuController
  ) {
    this.myForm = this.createMyForm();
  }
  LoginFailToast(){
    let toast = this.toastCtrl.create({
      message: "Email no registrado.",
      duration: 2000,
      cssClass: "tostadaconmanteca",
      position: 'middle'
    });
    toast.present();
  }
  login(){
    this.httpProvider.login({email: this.myForm.value["email"], pw: this.myForm.value["password"]}).subscribe((res: any) => {
       if  (res.error == 'LF'){
        this.LoginFailToast();
     } else {
         this.navCtrl.setRoot(LandingPage);
     }
    }, (err) => {
      console.log(err);
    });
  }

  private createMyForm(){
    return this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      password: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillLeave() {
    //this.menu.swipeEnable(true);
   }

}
