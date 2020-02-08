import { Component, OnInit, Input, SimpleChanges, Output } from '@angular/core';
import { COUNTRIES } from '../exports';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ContactService } from '../contact.service';
import { SET_CONTACTS } from '../reducers/contacts-reducer';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactData: any = <any>{};
  countries = COUNTRIES;
  @Input('edit') edit: boolean;
  @Input('contact') contact: any = <any>{};
  @Output('contactEdited') contactEdited = new EventEmitter();
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    addressLineOne: new FormControl('', Validators.required),
    addressLineTwo: new FormControl(''),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern(this.getPostalCodeRegex())]),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.getPhoneRegex())]),
    age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(200)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/[^@]+@[^\.]+\..+/)]),
  });
constructor(
    private store: Store<any>,
    private contactService: ContactService,
    private router: Router
  ) { }
ngOnInit() {
  }
ngOnChanges(changes: SimpleChanges) {
    if (this.contact) {
      this.contactData = this.contact;
    }
  }
getPostalCodeRegex() {
    if (this.contactData.country == "United States") {
      return /^[0-9]{5}(?:-[0-9]{4})?$/;
    } else if (this.contactData.country == "Canada") {
      return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    }
    return /./;
  }
getPhoneRegex() {
    if (["United States", "Canada"].includes(this.contactData.country)) {
      return /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    }
    return /./;
  }
save() {
    if (this.contactForm.invalid) {
      return;
    }
if (this.edit) {
      this.contactService.editContact(this.contactData)
        .subscribe(res => {
          this.contactEdited.emit('');
        })
    }
    else {
      this.contactService.addContact(this.contactData)
        .subscribe(res => {
          this.getContacts();
          this.router.navigate(['/']);
        })
    }
  }
getContacts() {
    this.contactService.getContacts()
      .subscribe(res => {
        this.store.dispatch({ type: SET_CONTACTS, payload: res });
      })
  }
}