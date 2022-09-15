import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TrainerspageComponent } from './trainerspage/trainerspage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { AboutusfreeComponent } from './aboutusfree/aboutusfree.component';
import { Adminstatus } from './admin/adminstatus';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    FreelancerComponent,
    TrainerspageComponent,
    AboutusComponent,
    AdminComponent,
    AboutusfreeComponent,
    Adminstatus
  ],
  imports: [
    BrowserModule,
    ModalModule,
    AppRoutingModule,
    NgxStarRatingModule,
      FormsModule, ReactiveFormsModule, BrowserAnimationsModule,RouterModule,HttpClientModule, NgbModule, AgGridModule.withComponents(
        [Adminstatus])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
