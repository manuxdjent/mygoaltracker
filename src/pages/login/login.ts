import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpProvider } from '../../providers/http/http';
import { LandingPage } from '../landing/landing';
// import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private toastCtrl: ToastController
  ) {
    this.myForm = this.createMyForm();
  }
  LoginFailToast(){
    let toast = this.toastCtrl.create({
      message: "Email no registrado.",
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
  login(){
    this.httpProvider.login({email: this.myForm.value["email"], pw: this.myForm.value["password"]}).subscribe((res: any) => {
      //console.log(res);
      // var mensaje = JSON.parse(res['_body']);
       if  (res.error == 'LF'){
        this.LoginFailToast();
     } else {
         //this.navCtrl.push(TabsPage);
         this.navCtrl.setRoot('MenusPage');
     }
      // else

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
    console.log('ionViewDidLoad LoginPage');
  }

}
