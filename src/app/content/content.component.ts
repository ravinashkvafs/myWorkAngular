import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
  capture: Object;
  private susc: Subscription;

  constructor(private mainS: MainService) {
    this.capture = mainS.someData;
  }

  ngOnInit() {
    this.susc = this.mainS.sub.subscribe(function(cp: Object){
      console.log(cp);
    });
  }

  ngOnDestroy(){
    this.susc.unsubscribe();
  }

  captureChange($event){
    // this.mainS.someChange(this.capture);
  }
}
