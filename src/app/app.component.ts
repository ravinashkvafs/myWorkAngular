import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import { fadeInAnimation } from './animate.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInAnimation]
})
export class AppComponent implements OnInit {
  constructor(private mainS: MainService) { }

  ngOnInit() { }

  animO = [
    { key: "asdgb", value: "sagyhj" },
    { key: "asdgb", value: "sagyhj" },
    { key: "asdgb", value: "sagyhj" }
  ];
  tab_num: Number = 0;
  isLoggedIn: Boolean = false;
  authData: Object = { username: '', password: '' };

  doRegister() {
    console.log(this.authData);
    if (this.authData['username'] == '' || this.authData['password'] == '') {
      alert("Kindly fill details !");
      return;
    }
    this.mainS.register(this.authData).subscribe(
      (response) => {
        console.log(response);
        this.mainS.setTokenInHeader(response['token']);
      },
      (err) => { alert(err.error.msg); }
    );
  }

  doLogin() {
    console.log(this.authData);
    if (this.authData['username'] == '' || this.authData['password'] == '') {
      alert("Kindly fill details !");
      return;
    }
    this.mainS.login(this.authData)
      .subscribe(
        (response) => {
          console.log(response);
          this.mainS.setTokenInHeader(response['token']);
        },
        (err) => { alert(err.error.msg); }
      );
  }

  doLogout() {
    this.mainS.removeTokenFromHeader();
  }
}