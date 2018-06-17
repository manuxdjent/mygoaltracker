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
  private hash;
  private pb;
  private userID;
  constructor(
    private http: Http,
    private storage: Storage,
    private api: Api,
    private app: App
  ){
    console.log('Hello HttpProvider Provider');

  }

  login(data){
    let seq = this.api.post('proyectoAPI/proyectoAPI/public/login',data).share();
    seq.subscribe((res: any) => {
      console.log(res.hash);
       this.storage.set('hash',res.hash);
       this.storage.set('pb',res.pb);
       this.storage.set('email',data['email']);
       this.storage.set('userID',res.userID);
    })
    return seq
  }
  signup(data){

    let seq = this.api.post('proyectoAPI/proyectoAPI/public/signup',data).share();
    seq.subscribe((res: any) => {
      this.login(data);
    })
    return seq
  }
  peso(data){
    let header = { headers: new HttpHeaders({'hash': data.hash, 'pb' : data.pb, 'userID' : data.userID })};
    let seq = this.api.get('proyectoAPI/proyectoAPI/public/peso', header).share();
    seq.subscribe((res: any) => {
    })
    return seq
  }
  alimentos(data){
    let header = { headers: new HttpHeaders({'hash': data.hash, 'pb' : data.pb, 'userID' : data.userID , 'input' : data.input})};
    let seq = this.api.get('proyectoAPI/proyectoAPI/public/alimentos', header).share();
    seq.subscribe((res: any) => {
      console.log(res);
    })
    return seq
  }
  registro(data){
    console.log(data);
    let header = { headers: new HttpHeaders({'hash': data.hash, 'pb' : data.pb, 'userID' : data.userID , 'fechaDispositivo' : data.fechaDispositivo, 'pag' : data.pag})};
    let seq = this.api.get('proyectoAPI/proyectoAPI/public/registro', header).share();
    seq.subscribe((res: any) => {
    })
    return seq
  }

  postRegistro(data,headersData){
    console.log(headersData);
    let header = { headers: new HttpHeaders(headersData)};
    let seq = this.api.post('proyectoAPI/proyectoAPI/public/registro',data,header).share();
    seq.subscribe((res: any) => {
    })
    return seq
  }

  postPeso(data,headersData){

    let header = { headers: new HttpHeaders(headersData)};
    let seq = this.api.post('proyectoAPI/proyectoAPI/public/peso',data,header).share();
    seq.subscribe((res: any) => {

    })
    return seq
  }
  postPesoMeta(data,headersData){
    let header = { headers: new HttpHeaders(headersData)};
    let seq = this.api.post('proyectoAPI/proyectoAPI/public/pesoMeta',data,header).share();
    seq.subscribe((res: any) => {
    })
    return seq
  }
}
