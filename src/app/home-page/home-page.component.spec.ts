import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ContactService } from '../contact.service';
import { SET_CONTACTS } from '../reducers/contacts-reducer';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'addressLineOne',
    'addressLineTwo',
    'city',
    'country',
    'postalCode',
    'phone',
    'age',
    'email',
    'edit',
    'delete'
  ]
  contacts: any[] = [];
constructor(
    private store: Store<any>,
    private contactService: ContactService,
    public dialog: MatDialog
  ) {
    store.pipe(select('contacts'))
      .subscribe(contacts => {
        this.contacts = contacts;
      })
  }
ngOnInit() {
    this.getContacts();
  }
getContacts() {
    this.contactService.getContacts()
      .subscribe(res => {
        this.store.dispatch({ type: SET_CONTACTS, payload: res });
      })
  }
openEditContactDialog(index: number) {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '70vw',
      maxHeight: '90vh',
      data: Object.assign({}, this.contacts[index])
    })
dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
deleteContact(contactId: number) {
    this.contactService.deleteContact(contactId)
      .subscribe(res => {
        this.getContacts();
      })
  }
}