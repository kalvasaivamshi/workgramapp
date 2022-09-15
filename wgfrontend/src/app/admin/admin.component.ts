import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { Adminstatus } from './adminstatus';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hamburgerToggleOn: any;
  defaultColDef: { resizable: boolean; };
  context: any;
  gridApi: any;
  constructor(private api: ApiService,private http: HttpClient,) {
    this.defaultColDef = { resizable: true };
    this.context = { componentParent: this };
  }

  ngOnInit(): void {
    this.setData();
  }
  frameworkComponents = {
    
    serviceActionsRenderer:Adminstatus ,

  };
  parentArr: any[] = [
    {
      name: 'Home',
      rname: '/admin',
      sublist: [],
      active: false,
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
  columnDefs: ColDef[] = [
    {
      field: 'Photo', headerName: "Photo", width: 150,
      cellRenderer: function (params : any) {
        return '<img src="'+ params.data.Photo +'" style="height: 2rem; width: 3rem; border-radius: 3rem;" /> ';
      },
      cellStyle: { 'text-align':'center' },
    },
    { field: 'Name', headerName: "Name", width: 150 },
    { field: 'Mobile', width: 150, headerName: " Mobile" },
    { field: 'Qualification', width: 220, headerName: "Qualification" },
    { field: 'Skillset', width: 450, headerName: "Skill set" },
    { field: 'Experience', headerName: "Experience", width: 100 },
    {
      field: 'Status', width: 100, headerName: "Status",
    },
    { field: 'ChangeTo', width: 150, headerName: "ChangeTo", cellRenderer: 'serviceActionsRenderer'},


  ]
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  adminData: any;
  rowData: any = [];
  changeStatus(params:any){
    console.log("dsc",params)
    // this.api.postLocations(params.data.userName, params.data.action.status).pipe().subscribe({
      this.http.get(this.api.getStatus +params.data.usename+"/status/"+params.data.action.status).subscribe((users: any) => {

    })
  }
  setData() {
    let tempData: any = [];
    this.api.getLocations().pipe().subscribe(
      (users: any) => {
      if (users["message"] == "Success") {
        let item = [];
        this.adminData = users["data"];
        this.adminData.forEach((element: any) => {
          let item: any = {};
          item = {
            usename:element.username,
            Photo: element.photo,
            Name: element.name,
            Mobile: element.mobile,
            Qualification: element.qualification,
            Skillset: element.skillset,
            Experience: element.exp,
            Status:element.status,
            ChangeTo:element.status,
            action: element ,
          }
          tempData.push(item);
           });
        this.rowData = [...tempData];
      }
    }
    , (error) => {
      Swal.fire(error)
    });
    
  }

}
