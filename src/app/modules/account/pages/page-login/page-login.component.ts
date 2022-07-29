import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
    loginForm: FormGroup;
    registerForm: FormGroup;
    constructor() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.email]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            confirmedPassword: new FormControl('', [Validators.required]),
        });
    }

    onSubmit() {
        if(this.loginForm.valid) {
            console.log(this._v());
        }
    }

    register(){
        // if(this.registerForm.valid) {
            console.log(this.registerForm.value);
        // }
    }
    _v() {
        return this.loginForm.value;
    }
}
