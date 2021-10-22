import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact_list/contact';
import { ContactService } from '../contact_list/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact : Contact = { "name": "", "contactNumber": "", "address": "","postCode": ""};

  constructor(public contactService: ContactService) { }

  ngOnInit(): void {
  }

  public createContact(){
    this.contactService.createContact(this.contact)
    .subscribe(
      data => {
        console.log(data);
      },
      (error: HttpErrorResponse)=>{
        console.log(error.message);
      }
    );
    this.contact = { "name": "", "contactNumber": "", "address": "","postCode": ""};
  }

}
