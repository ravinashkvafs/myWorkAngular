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
export class ChatService {

  constructor(private http: HttpClient, private router: Router) {
    console.log("constructor");
  }


}
