import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class ContactService 
{
    private apiServiceUrl = environment.apiBaseUrl;
    
    constructor (private  http:HttpClient){}

    private createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', 'Basic ' +
          btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20')); 
    }
    
    public getContacts() : Observable<Contact[]>
    {
        return this.http.get<Contact[]>(`${this.apiServiceUrl}api/v1/contact`)
    }


    public createContact(contact: Contact) : Observable<Contact>
    {
        
        var url = `${this.apiServiceUrl}api/v1/contact/create`;
        var data = JSON.stringify(contact);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };

        return this.http.post<Contact>(url,data,httpOptions);
    }
    
}