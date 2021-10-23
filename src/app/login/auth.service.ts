import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cred } from './Cred';
import { LoginResponseJWT } from './login-response-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private valid = new BehaviorSubject<boolean>(false);;
  private _access_token: string;
  private _refresh_token: string;
  
  

  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public login(cred:Cred)
  {
    let url = `${this.apiServiceUrl}login`;
    let content = JSON.stringify(cred);
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };
    console.log(content);
    
    return this.http.post<LoginResponseJWT>(url,content,httpOptions);
  }

  public setValid(val:boolean){
    this.valid.next(val);
  }

  public isValid(){
    return this.valid.asObservable;
  }

  public getRefreshToken(): string {
    return this._refresh_token;
  }
  public setRefreshToken(value: string) {
    this._refresh_token = value;
  }

  public getAccessToken(): string {
    return this._access_token;
  }
  public setAccessToken(value: string) {
    this._access_token = value;
  }
  
}
