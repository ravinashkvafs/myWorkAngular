import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { UiModule } from './ui/ui.module';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { MainService } from './main.service';
import { ChatService } from './chat.service';
import { AuthGuard } from './auth-guard.service';
import { SpecificComponent } from './about/specific/specific.component';
import { UploadComponent } from './upload/upload.component';

const appRoutes: Routes = [
  { path: 'temp', component: MainComponent },
  { path: '', component: MainComponent },
  { path: 'home', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'about/:id', component: SpecificComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    MainComponent,
    AboutComponent,
    ContactComponent,
    SpecificComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
