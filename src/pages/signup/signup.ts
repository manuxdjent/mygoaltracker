import { Component } from '@angular/core';
import { Nav,IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpProvider } from '../../providers/http/http';
import { LandingPage } from '../landing/landing';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private httpProvider : HttpProvider
  ) {
    this.myForm = this.createMyForm(); 
  }

  signup(){
    this.httpProvider.signup({email: this.myForm.value["email"], pw: this.myForm.value["password"]}).subscribe((res: any) => {
      console.log(res);
      this.httpProvider.login({email: this.myForm.value["email"], pw: this.myForm.value["password"]}).subscribe(()=>{
        this.navCtrl.push(LandingPage);
      });
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
    console.log('ionViewDidLoad SignupPage');
  }

}
