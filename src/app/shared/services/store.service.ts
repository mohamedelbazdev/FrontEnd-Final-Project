import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = 'جامعة سوهاج الجديدة New، مركز سوهاج، سوهاج';
    email = 'https://www.iti.gov.eg/';
    phone = ['01100101010'];
    hours = 'Mon-Sat 10:00pm - 7:00pm';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
