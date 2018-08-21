import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFile: File;
  output: any;
  uploadedPercentage = 0;

  constructor(private mainS: MainService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.uploadedPercentage = 0;

    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile);

    this.mainS.uploadFile(uploadData)
      .subscribe(response => {

        switch (response.type) {
          case HttpEventType.Sent:
            // this.slimLoadingBarService.start();
            break;
          case HttpEventType.Response:
            // this.slimLoadingBarService.complete();
            alert('uploaded !');

            break;
          case 1: {
            if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
              this.uploadedPercentage = event['loaded'] / event['total'] * 100;
              // this.slimLoadingBarService.progress = Math.round(this.uploadedPercentage);
            }
            break;
          }
        };

        console.log(response); // handle event here
        // this.output = response['body'];

      });
  }

}
