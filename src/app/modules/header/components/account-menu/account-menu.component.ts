import { Component, EventEmitter, Output } from '@angular/core';
import {AuthService} from "../../../account/auth.service";

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    constructor(private auth: AuthService) { }

    logout(){
        this.auth.logoutUser()
    }

    isLogin():boolean{
       return this.auth.loggedIn()
    }
}
