import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,
    private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
  }
  loginForm = this.fb.group({
    'userName': ['', Validators.compose([Validators.required])],
    'password': ['', Validators.compose([Validators.required])],
  });

  // isFieldValid(form: FormGroup, field: string) {
  //   if (form) {
  //     return !form.get(field).valid && form.get(field).touched;
  //   }
  // }
  GoToDashboard() {
    let username = this.loginForm.get('userName')?.value;
    let password = this.loginForm.get('password')?.value;
    this.api.postLocations(username, password).pipe().subscribe(
      (data: any) => {
      // this.api.storeRouteComponentData(this.constants.ls_loginData, data["data"]);
      if (data["message"] == "Success") {
        if (data["data"].role == 1) {

          this.router.navigate(["/admin"]);
        }
        else if (data["data"].role == 2) {
          localStorage.setItem("2", data["data"].username);
          this.router.navigate(["/freelancer"]);
        }
        else if (data["data"].role == 3) {
           this.router.navigate(["/user"]);

        }
      }

    }
    , (error) => {
      Swal.fire(error["error"].message)
    });

  }
  Register() {
    this.router.navigate(["/register"]);
     }
}
