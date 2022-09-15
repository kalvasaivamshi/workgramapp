import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { RegisterComponent } from './register/register.component';
import { TrainerspageComponent } from './trainerspage/trainerspage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminComponent } from './admin/admin.component';
import { AboutusfreeComponent } from './aboutusfree/aboutusfree.component';

// const routes: Routes = [];



  const routes: Routes  = [

    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginComponent,
    },
  
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'user',
      component: UserComponent,
      
    },
    {
      path: 'admin',
      component: AdminComponent,
      
    },
    {
      path: 'freelancer',
      component: FreelancerComponent,
      
    },
    {
      path: 'trainersPage',
      component: TrainerspageComponent,
      
    },
    {
      path: 'aboutus',
      component: AboutusComponent,
      
    },
    {
      path: 'aboutusfree',
      component: AboutusfreeComponent,
      
    },
    {
      path: '**',
      redirectTo: '/login'
    }
  ]
    @NgModule(
      {
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    }
    )
    export class AppRoutingModule {
}

