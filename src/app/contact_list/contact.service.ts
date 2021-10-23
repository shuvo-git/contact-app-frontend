import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({providedIn: 'root'})

export class ContactService 
{
    private apiServiceUrl = environment.apiBaseUrl;
    
    constructor (private  http:HttpClient,private authService:AuthService){}

    
        
    
    public getContacts() : Observable<Contact[]>
    {
        var url = `${this.apiServiceUrl}api/v1/contact/`;
        console.log(this.authService.getAccessToken());
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getAccessToken()}`
            })
        };
        console.log(httpOptions);
        
        
        return this.http.get<Contact[]>(url,httpOptions);
        
    }


    public createContact(contact: Contact) : Observable<Contact>
    {
        
        var url = `${this.apiServiceUrl}api/v1/contact/create`;
        var data = JSON.stringify(contact);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': `Bearer ${this.authService.getAccessToken()}`
            })
        };
        return this.http.post<Contact>(url,data,httpOptions);
    }
    
}