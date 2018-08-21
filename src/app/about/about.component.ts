import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private mainS: MainService) { }

  ngOnInit() {
  }

  // imgPath: String = '';

  list = [
    { name: "Laptop", path: "assets/images/lap.png" },
    { name: "Earth", path: "assets/images/earth.png" },
    { name: "Mario", path: "assets/images/mario.png" }
  ];

  selectImg = function (i) {
    // this.imgPath = this.list[i].path;
  };
}
