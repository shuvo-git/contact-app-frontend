import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact_list.component.html',
  styleUrls: ['./contact_list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: Contact[] = [];

  constructor (private  contactService: ContactService){}

  ngOnInit(): void {
    this.getContacts();
  }

  public getContacts(): void {
    this.contactService.getContacts().subscribe(
      (response: Contact[])=>{
        this.contacts = response;
        console.log(this.contacts);
      },
      (error: HttpErrorResponse)=>{
        console.log(error.message);
      }
    );
  }





}

