import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { NgxStarRatingModule } from 'ngx-star-rating';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  @ViewChild('trainerDataDisplay') trainerDataDisplay: any;
  hamburgerToggleOn: any;
  rating3: number;

  constructor(private api:ApiService,  private fb: FormBuilder,
  
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,private modalService: NgbModal) { 
      this.rating3 = 2;
    }

  ngOnInit(): void {
    console.log("user")
    this.getWork()
  }
  workshopList:any;
  workshopData:any;
  getWork(){
  this.http.get(this.api.getWorkShops).subscribe((users:any)=> {
    if(users["message"]="success"){
      this.workshopData=users["data"];
      console.log(users["data"])
      this.workshopList = users["data"];
    }
    });
  }
  traineeData:any;
  trainerData(item:any){
    this.traineeData=item;
    this.modalService.open(this.trainerDataDisplay, {size: 'lg', centered: true, windowClass: 'addDocumentsModal'  });

  }
  parentArr: any[] = [
    {
      name: 'Home',
      rname: '/user',
      sublist: [],
      active: false,
    },
    {
      name: 'Trainers',
      rname: '/trainersPage',
      sublist: [
      ],
    },
    {
      name: 'About Us',
      rname: '/aboutus',
      active: false,
      sublist: [ ],
    },
    {
      name: 'Logout',
      rname: '/login',
      active: false,
      sublist: [ ],
    },
   
  ];
  redirect(link:any){
window.open(link,"_blank")
  }
  reviewForm = this.fb.group({
    review: ['', Validators.compose([Validators.required])],
   
  });
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

}
