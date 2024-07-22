import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private loggedInUserId: string | undefined;
  private emailAddress : string | undefined;
  private static HOST = environment.API_ENDPOINT;
  constructor(private httpClient : HttpClient) { }
  
  setLoggedInUserEmailAddress(email : string){
    this.emailAddress = email;
  }
  getLoggedInUserEmailAddress(){
    return this.emailAddress;
  }

  registerUser(payload : {firstName :string , lastName : string, emailAddress : string , password  : string}){
    return this.httpClient.post(`${CommonService.HOST}/user/registerUser`,payload);
  }

  login(payload : any){
    return this.httpClient.post(`${CommonService.HOST}/user/login`,payload);
  } 
  
  createTask(payload : {title:string,description:string}){
    return this.httpClient.post(`${CommonService.HOST}/task/create`,payload);
  }

  fetchTask(){
    return this.httpClient.get(`${CommonService.HOST}/task/fetch`);
  }
  updateTask(id:string,payload:any){
    return this.httpClient.put(`${CommonService.HOST}/task/update/${id}`,payload);
  }
} 