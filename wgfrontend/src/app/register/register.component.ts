import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  baseurl: any;
  candidateTypeSelected: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  user: boolean = false;
  freelancer: boolean = false;
  ngOnInit(): void {
    console.log('reg');
  }
  userRegistration() {
    this.user = true;
    this.freelancer = false;
    this.candidateTypeSelected = true;
  }
  freelancerRegistration() {
    this.freelancer = true;
    this.user = false;
    this.candidateTypeSelected = true;
  }
  userForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])],
    confirmPassword: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required])],
    mobile: ['', Validators.compose([Validators.required])],
    address: ['', Validators.compose([Validators.required])],
  });
  freeLancerForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])],
    confirmPassword: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required])],
    mobile: ['', Validators.compose([Validators.required])],
    exp: ['', Validators.compose([Validators.required])],
    photo: ['', Validators.compose([Validators.required])],
    skillset: ['', Validators.compose([Validators.required])],
    qualification: ['', Validators.compose([Validators.required])],
  });
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.baseurl = reader.result;
      };
    }
  }
  customerModel = {
    name: null,
    username: null,
    password: null,
    email: 0, // Set it logged in user
    qualification: null,
    mobile: null,
    exp: null,
    photo: null,
    role: '',
    status: '',
    skillset: '',
  };
  freeLancerRegister() {
    this.customerModel.name = this.freeLancerForm?.get('name')?.value;
    this.customerModel.username = this.freeLancerForm?.get('username')?.value;
    this.customerModel.password = this.freeLancerForm?.get('password')?.value;
    this.customerModel.qualification =
      this.freeLancerForm.get('qualification')?.value;
    this.customerModel.email = this.freeLancerForm.get('email')?.value;
    this.customerModel.exp = this.freeLancerForm.get('exp')?.value;
    this.customerModel.mobile = this.freeLancerForm.get('mobile')?.value;
    this.customerModel.photo = this.baseurl.replace(
      'data:image/jpeg;base64,',
      ''
    );
    this.customerModel.skillset = this.freeLancerForm.get('skillset')?.value;
    this.customerModel.role = '2';
    this.customerModel.status = 'yes';
    // this.customerModel.username=localStorage.getItem('2') || '';
    console.log(this.customerModel);
    this.http.post(this.api.addFreeLancer, this.customerModel).subscribe(
      (data: any) => {
        if (data['message'] == 'success') {
          Swal.fire("Registered Succesfully")
          setTimeout(()=>{
            this.router.navigate(['/login']);
          }, 2000)
        } else {
        }
      },
      (error) => {
        Swal.fire(error["error"].message)
      }
    );
  }
  userModel = {
    name: null,
    username: null,
    password: null,
    email: 0, // Set it logged in user
    address: null,
    mobile: null,
    role: '',
    status: '',
  };

  Register() {
    this.userModel.name = this.userForm?.get('name')?.value;
    this.userModel.username = this.userForm?.get('username')?.value;
    this.userModel.password = this.userForm?.get('password')?.value;
    this.userModel.address = this.userForm.get('address')?.value;
    this.userModel.email = this.userForm.get('email')?.value;
    this.userModel.mobile = this.userForm.get('mobile')?.value;
    this.userModel.role = '3';
    // this.router.navigate(["/login"]);
    console.log(this.userModel);
    this.http.post(this.api.addUser, this.userModel).subscribe(
      (data: any) => {
        if (data['message'] == 'Success') {
          
          Swal.fire("Registered Succesfully")
          setTimeout(()=>{
            this.router.navigate(['/login']);
          }, 2000)
        } else {
        }
      },
      (error) => {
        Swal.fire(error["error"].message)
      }
    );
  }
  checkuserpass(){
    console.log( this.userForm?.get('password')?.value)
    console.log(this.userForm?.get('confirmPassword')?.value)
    if(this.userForm?.get('password')?.value!==this.userForm?.get('confirmPassword')?.value){
      console.log("ugyh")
      this.userForm.controls.confirmPassword.setErrors({ passwordnotmatched: true });
      Swal.fire("password and confirm password should be same")
      
    }
  }
  checkpass(){
    console.log("cdsc")
    console.log( this.freeLancerForm?.get('password')?.value)
    console.log(this.freeLancerForm?.get('confirmPassword')?.value)
    if(this.freeLancerForm?.get('password')?.value!==this.freeLancerForm?.get('confirmPassword')?.value){
      console.log("ugyh")
      this.freeLancerForm.controls.confirmPassword.setErrors({ passwordnotmatched: true });
      Swal.fire("password and confirm password should be same")
      
    }
    
  }
  get f() {
    // console.log(this.userForm.controls);    
    return this.userForm.controls;
  }
  get ff() {
    return this.freeLancerForm.controls;
  }
}
