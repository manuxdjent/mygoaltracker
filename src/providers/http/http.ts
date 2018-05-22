import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import {Http ,Response, RequestOptions, RequestMethod } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { LandingPage } from '../../pages/landing/landing';
import { Api } from '../api/api';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class HttpProvider {
  public header: HttpHeaders;
  constructor(
    private http: Http,
    private storage: Storage,
    private api: Api,
    private app: App
  ){
    console.log('Hello HttpProvider Provider');

  }

  login(data){
    //let nav = this.app.getActiveNav
    let seq = this.api.post('proyectoAPI/proyectoAPI/public/login',data).share();
    seq.subscribe((res: any) => {
      console.log(res.hash);
       this.storage.set('hash',res.hash);
       this.storage.set('pb',res.pb);
       this.storage.set('email',data['email']);
       this.storage.set('userID',res.userID);
    })
    return seq
  // return new Promise((resolve, reject) => {
  //   this.http.post('http://192.168.1.59/proyectoAPI/proyectoAPI/public/login',
  //   // this.http.post('http://192.168.0.159/proyectoAPI/proyectoAPI/public/login',
  //   data, {headers: { 'Content-Type': 'application/json' }})
  //     .subscribe(res => {
  //       //console.log(res);
  //       this.storage.set('hash',res.json()['hash']);
  //       this.storage.set('pb',res.json()['pb']);
  //       this.storage.set('email',data['email']);
  //       resolve(res);
  //     }, (err) => {
  //       reject(err);
  //     });
  // });
  }
  signup(data){

    let seq = this.api.post('proyectoAPI/proyectoAPI/public/signup',data).share();
    seq.subscribe((res: any) => {
      this.login(data);
    })
    return seq
  // return new Promise((resolve, reject) => {
  //   this.http.post('http://192.168.1.59/proyectoAPI/proyectoAPI/public/signup',
  //   // this.http.post('http://192.168.0.159/proyectoAPI/proyectoAPI/public/signup',
  //   data, {headers: { 'Content-Type': 'application/json' }})
  //     .subscribe(res => {
  //       resolve(res);
  //       //console.log("");
  //
  //     }, (err) => {
  //       reject(err);
  //     });
  // });

  }
  peso(data){
    //let nav = this.app.getActiveNav
    //this.headers.append(data);
    console.log(data);
    let header = { headers: new HttpHeaders({'hash': data.hash, 'pb' : data.pb, 'userID' : data.userID })};    //this.header.set(data);
    // this.header.append('pb', 'ole');
    // this.header.append('userID', '19');
    //let options = new RequestOptions({header: this.header});
    let seq = this.api.get('proyectoAPI/proyectoAPI/public/peso', header).share();
    seq.subscribe((res: any) => {
    })
    return seq
  }
}
