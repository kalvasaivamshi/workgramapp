import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
baseurl='http://localhost:8080/api/'

  getLocations() {
    return this.http.get(this.baseurl+'getFreeLancers');
  } 
  // getWorkshopsById(username:any) {
  //   return this.http.get(this.baseurl+'getWorkShopsByUserName'+username);
  // } 
  public getWorkshopsById=this.baseurl+'getWorkShopsByUserName/';
  public getWorkShops=this.baseurl+'getWorkShops/';
  public addWork=this.baseurl+'addWorkshops/';
  public addFreeLancer=this.baseurl+'addFreeLancers/';
  public addUser=this.baseurl+'addUsers/';
  public getTrainers=this.baseurl+'getFreeLancers/';
  public  getStatus=this.baseurl+'update/username/';
  postLocations(username:any,password:any) {
    // return this.http.post(this.baseurl+'locations/?id:'+id+'&name:'+name,{id:id,name:name});
        return this.http.post(this.baseurl+'login',{"username":username,"password":password});

  } 
}