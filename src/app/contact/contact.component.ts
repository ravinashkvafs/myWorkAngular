import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  apiCall: object = {};

  constructor(private mainS: MainService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.subs.unsubscribe();
  }

  getData() {
    // this.mainS.updateList()
    //     .subscribe(
    //       (response) => {console.log(response); this.apiCall = response;},
    //       (err) => {this.apiCall = err;}
    //     );
    this.mainS.updateList2()
      .subscribe(
        (response) => { console.log(response); this.apiCall = response; },
        (err) => { this.apiCall = err; }
      );
  }
}
