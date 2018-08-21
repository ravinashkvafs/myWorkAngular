import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import CryptoJS from 'crypto-js';

const host: String = 'http://localhost:7999';
const scrt: String = 'secret/code';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private router: Router) {
    console.log("constructor");
    this.loadCredentials();
  }

  someData: Object = { name: 'Content Title', email: 'xyz' };
  sub = new Subject<Object>();
  sub2 = new Subject<Object>();
  retData = {};

  someChange(data: Object) {
    this.someData = data;
    this.sub.next(this.someData);
  }

  updateList() {
    console.log(this.headers);
    return this.http.get('https://reqres.in/api/unknown', this.headers);
  }

  updateList2() {
    console.log(this.headers);
    return this.http.get(host + '/user/this', this.headers);
  }

  login(obj) {
    var det = JSON.parse(JSON.stringify(obj));
    det.password = CryptoJS.AES.encrypt(det.password, scrt).toString();
    return this.http.post(host + '/user/login', det);
  }

  register(obj) {
    var det = JSON.parse(JSON.stringify(obj));
    det.password = CryptoJS.AES.encrypt(det.password, scrt).toString();
    return this.http.post(host + '/user/register', det);
  }

  //data store - down

  headers: Object = { headers: { 'x-access-token': '' } };
  isLoggedIn: Boolean = false;

  setTokenInHeader(tok) {
    this.isLoggedIn = true;
    this.headers['headers']['x-access-token'] = tok;
    window.localStorage.tkn = tok;
    this.router.navigate(['/home']);
  }

  removeTokenFromHeader() {
    this.isLoggedIn = false;
    this.headers['headers']['x-access-token'] = undefined;
    delete window.localStorage.tkn;
    this.router.navigate(['/']);
  }

  loadCredentials() {
    console.log("loaded local");
    if (window.localStorage.tkn) {
      this.headers['headers']['x-access-token'] = window.localStorage.tkn;
      this.isLoggedIn = true;
    }
    else {
      // this.router.navigate(['/']);
    }
  }

  uploadFile(data) {
    return this.http.post(host + '/uploader/upload-file', data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  isAuth() {
    return this.isLoggedIn;
  }
}
