import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutusfree',
  templateUrl: './aboutusfree.component.html',
  styleUrls: ['./aboutusfree.component.css']
})
export class AboutusfreeComponent implements OnInit {

  hamburgerToggleOn: any;

  constructor() { }

  ngOnInit(): void {
  }
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

}
