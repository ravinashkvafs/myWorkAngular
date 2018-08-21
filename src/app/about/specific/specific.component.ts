import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {

  choice: number = 0;
  imgPath: String;
  list = [
    { name: "Laptop", path: "assets/images/lap.png" },
    { name: "Earth", path: "assets/images/earth.png" },
    { name: "Mario", path: "assets/images/mario.png" }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.choice = this.route.snapshot.params['id'];
    this.imgPath = this.list[this.choice].path;
  }
}
