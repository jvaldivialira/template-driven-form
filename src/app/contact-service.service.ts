import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
constructor(
    private http: HttpClient
  ) { }
getContacts() {
    return this.http.get(`${environment.apiUrl}/contacts`);
  }
addContact(contactData) {
    return this.http.post(`${environment.apiUrl}/contacts`, contactData);
  }
editContact(contactData) {
    return this.http.put(`${environment.apiUrl}/contacts/${contactData.id}`, contactData);
  }
deleteContact(contactId) {
    return this.http.delete(`${environment.apiUrl}/contacts/${contactId}`);
  }
}