import { Component, EventEmitter, Output } from '@angular/core';
import {AuthService} from "../../../account/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})

export class AccountMenuComponent {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    loginForm: FormGroup;

    constructor(private auth: AuthService,private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    logout(){
        this.auth.logoutUser()
    }

    isLogin():boolean{
       return this.auth.loggedIn()
    }

    onSubmit() {
        if(this.loginForm.valid) {
            this.auth.loginUser(this.loginForm.value).subscribe((res:any) => {
                this.auth.setToken(res.token)
                this.router.navigateByUrl('/')
            })
        }
    }
}
