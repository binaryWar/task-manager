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
  
  setLoggedInUserId(userId: string) {
    this.loggedInUserId = userId;
  }

  getLoggedInUserId(): string | undefined {
    return this.loggedInUserId;
  }
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
  
  createIncident(payload : any){
    return this.httpClient.post(`${CommonService.HOST}/incident/create`,payload);
  }
  fetchUserIncidents(){
    return this.httpClient.get(`${CommonService.HOST}/incident/fetch`);
  }
  updateIncident(payloadBody : any ){
    return this.httpClient.put(`${CommonService.HOST}/incident/update`,payloadBody);
  }
  fetchReporters(value:string){
    if(!value || value.trim().length === 0) return;
    return this.httpClient.get(`${CommonService.HOST}/reporter/search?prefix=${value}`);
  }
  forgotPassword(payload : any){
    return this.httpClient.put(`${CommonService.HOST}/user/forgot-password`,payload);
  }
} 