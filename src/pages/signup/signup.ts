import { Component } from '@angular/core';
import { Nav,IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpProvider } from '../../providers/http/http';
import { LandingPage } from '../landing/landing';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private myForm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    private httpProvider : HttpProvider,
    private toastCtrl : ToastController
  ) {
    this.myForm = this.createMyForm();
  }

  SignupFailToast(){
    let toast = this.toastCtrl.create({
      message: "Email ya está siendo utilizado.",
      duration: 2000,
      cssClass: "tostadaconmanteca",
      position: 'middle'
    });
    toast.present();
  }

  signup(){
    this.httpProvider.signup({email: this.myForm.value["email"], pw: this.myForm.value["password"], meta: this.myForm.value["meta"]}).subscribe((res: any) => {
      if (res.result == false) this.SignupFailToast();
      else {
        this.httpProvider.login({email: this.myForm.value["email"], pw: this.myForm.value["password"]}).subscribe(()=>{
          //this.navCtrl.push(LandingPage);
          this.navCtrl.setRoot(LandingPage);
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  private createMyForm(){
    return this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      password: ['', Validators.required],
      meta: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
