import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-trainerspage',
  templateUrl: './trainerspage.component.html',
  styleUrls: ['./trainerspage.component.css']
})
export class TrainerspageComponent implements OnInit {
  hamburgerToggleOn: any;

  @ViewChild('trainerDataDisplay') trainerDataDisplay: any;
  constructor(private modalService: NgbModal,private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, ) { }

  ngOnInit(): void {
    this.getData();
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
  traineeData:any;
      trainerData(item:any){
        this.traineeData=item;
        this.modalService.open(this.trainerDataDisplay, {size: 'lg', centered: true, windowClass: 'addDocumentsModal'  });
    
      }
      trainersData:any;
      getData(){
        console.log("bhjhgf")
        this.http.get(this.api.getTrainers).subscribe((users: any) => {
          if (users["message"] = "success") {
            this.trainersData=users["data"]
            console.log(users["data"])
           this.modalService.dismissAll();
          }
    
        })
      }
     
}
