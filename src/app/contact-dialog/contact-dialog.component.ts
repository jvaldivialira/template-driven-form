import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactService } from '../contact.service';
import { Store } from '@ngrx/store';
import { SET_CONTACTS } from '../reducers/contacts-reducer';
@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contactData: any,
    private contactService: ContactService,
    private store: Store<any>
  ) { }
ngOnInit() {
  }
getContacts() {
    this.contactService.getContacts()
      .subscribe(res => {
        this.store.dispatch({ type: SET_CONTACTS, payload: res });
        this.dialogRef.close();
      })
  }
}