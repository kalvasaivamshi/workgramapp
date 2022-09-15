import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import Swal from 'sweetalert2';

// import { FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.css']
})
export class FreelancerComponent implements OnInit {
  
  @ViewChild('trainerDataDisplay') trainerDataDisplay: any;
  hamburgerToggleOn: any;
  @ViewChild('addworkshop') addworkshop: any;

  // public files: NgxFileDropEntry[] = [];
  fileOfCompany: any;
  clickedOnUpload: any;
  fileName: any;
  progressBarArray: any;
  constructor(private fb: FormBuilder, private router: Router,
    private modalService: NgbModal, private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getWorksh()
  }
  //   onFileSelected(event:any, idNo:number) {

  //     this.clickedOnUpload = true;

  //     const file:File = event.target.files[0];

  //     if (file) {

  //       this.fileName = file.name;
  //       //removing extension of file
  //       this.fileName = this.fileName.substr(this.fileName.lastIndexOf('\\') + 1);
  //       this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf('.'));  
  //       this.progressBarArray.push({
  //         no: idNo,
  //         progressBarValue: 20,
  //         spinnerDisplay: true,
  //         fileName: this.fileName,
  //       });
  //       const formData = new FormData();
  //       formData.append("thumbnail", file);
  //     }
  // }
  traineeData:any;
      trainerData(item:any){
        this.traineeData=item;
        this.modalService.open(this.trainerDataDisplay, {size: 'lg', centered: true, windowClass: 'addDocumentsModal'  });
    
      }
  logoutButtonClicked() {
    this.router.navigate(["/freelancer"]);
  }
  public today: Date = new Date();
  minDate = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDate(),
  };
  getData() {
  }

  time = { hour: 13, minute: 30 };
  sub: any;
  customerIdFromRoute: any;
  addWorkshop() {
    this.modalService.open(this.addworkshop, { size: 'lg', centered: true, windowClass: 'addDocumentsModal' });

  }


  imagepath: any;
  imagePath(url: any) {
    const imageBlob = url.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;

  }
  workshopList: any;
  getWorksh() {
    this.http.get(this.api.getWorkshopsById + localStorage.getItem('2')).subscribe((users: any) => {
      // this.api.getLocations().pipe().subscribe((users:any)=>{
      if (users["message"] = "success") {
        console.log(users["data"])
        this.modalService.dismissAll();
        this.workshopList = users["data"];
        console.log(this.workshopList)
        this.modalService.dismissAll();
      }

    })

  }
  customerModel = {
    "name": null,
    "wdate": null,
    "wtime": null,
    "location": 0,  // Set it logged in user
    "description": null,
    "topics": null,
    "reglink": null,
    "banner": null,
    "username": '', 
  }
  // let tempDate = new Date(data.effectiveFrom);
  //     let formattedDate = {
  //       year: tempDate.getFullYear(),
  //       month: tempDate.getMonth() + 1,
  //       day: tempDate.getDate(),
  //     };
  //     this.workshopForm.get('date').setValue(formattedDate);

  addCustomer() {
    let tempDate = this.workshopForm.value.date;
    let formattedDate = moment(
      tempDate.year + '-' + tempDate.month + '-' + tempDate.day,
      'YYYY-MM-DD'
      ).format('YYYY-MM-DD ');
      this.workshopForm.get('date')?.setValue(formattedDate);
      let tempTime = this.workshopForm.value.time;
      let formattedTime=moment(tempTime.hour+':'+tempTime.minute,"hh:mm").format('hh:mm')
      this.workshopForm.get('time')?.setValue(formattedTime);
     
    this.customerModel.name = this.workshopForm?.get("name")?.value;
    this.customerModel.wdate = this.workshopForm?.get("date")?.value;
    this.customerModel.wtime = this.workshopForm?.get("time")?.value;
    this.customerModel.location = this.workshopForm.get("location")?.value;
    this.customerModel.description = this.workshopForm.get("description")?.value;
    this.customerModel.topics = this.workshopForm.get("topics")?.value;
    this.customerModel.reglink = this.workshopForm.get("link")?.value;
    this.customerModel.banner=this.baseurl.replace("data:image/jpeg;base64,", "");
    this.customerModel.username=localStorage.getItem('2') || '';
   
    this.http.post(this.api.addWork, this.customerModel).subscribe((data:any) => {
      if (data["message"] == "Success") {
        Swal.fire("Registered Succesfully")
        setTimeout(()=>{
          this.resetFormOfCompanyDetails()
          this.modalService.dismissAll();
          this.getWorksh();
          // this.router.navigate(['/login']);
        }, 2000)
       } else {
      
      }
    }, (error) => {
     
    });

  }
  redirect(link:any){
    window.open(link,"_blank")
      }
  resetFormOfCompanyDetails( ){
    this.workshopForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'date': ['', Validators.compose([Validators.required])],
      'time': ['', Validators.compose([Validators.required])],
      'location': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])],
      'topics': ['', Validators.compose([Validators.required])],
      'link': ['', Validators.compose([Validators.required])],
      'image': ['', Validators.compose([Validators.required])]
  
    });
  }
 

  companyLogo: File[] = [];

  baseurl: any;
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

  workshopForm = this.fb.group({
    'name': ['', Validators.compose([Validators.required])],
    'date': ['', Validators.compose([Validators.required])],
    'time': ['', Validators.compose([Validators.required])],
    'location': ['', Validators.compose([Validators.required])],
    'description': ['', Validators.compose([Validators.required])],
    'topics': ['', Validators.compose([Validators.required])],
    'link': ['', Validators.compose([Validators.required])],
    'image': ['', Validators.compose([Validators.required])]

  });
  parentArr: any[] = [
    {
      name: 'Home',
      rname: '/freelancer',
      sublist: [],
      active: false,
    },
    {
      name: 'About Us',
      rname: '/aboutusfree',
      active: false,
      sublist: [],
    },
    {
      name: 'Logout',
      rname: '/login',
      active: false,
      sublist: [],
    },

  ];
  toggleMenu(flg: number) {
    console.log('hambuger clicked ' + flg);
    this.hamburgerToggleOn = !this.hamburgerToggleOn;
    let hamburgerBtn = document.getElementById('hamburger');
    if (this.hamburgerToggleOn) {
      hamburgerBtn?.classList.add('active');
      let headerMenuItems =
        document.getElementsByClassName('header-bottom-menu');
      for (let i = 0; i < headerMenuItems.length; i++) {
        headerMenuItems[i].classList.add('active');
      }
    } else {
      console.log(flg);
      hamburgerBtn?.classList.remove('active');
      let headerMenuItems =
        document.getElementsByClassName('header-bottom-menu');
      for (let i = 0; i < headerMenuItems.length; i++) {
        headerMenuItems[i].classList.remove('active');
      }
    }
  }
  get f() { return this.workshopForm.controls }



}


