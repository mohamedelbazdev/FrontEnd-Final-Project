import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent{
    loginForm: FormGroup;
    registerForm: FormGroup;

    constructor
    (
        // private fb: FormBuilder,
        private router: Router,
        private auth: AuthService
    )
    {
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
            this.auth.loginUser(this._v()).subscribe(res => {
                console.log(res)
                this.auth.setToken(res.token)
                // this.router.navigate('/');
                this.router.navigateByUrl('/')
            })
            // this.http.post('http://127.0.0.1:8000/api/auth/login', this._v()).subscribe(
            //     // next: (result:any) => {
            //     //     localStorage.setItem('token', result.access_token);
            //     //     this.router.navigate('/account');
            //     //  },
            //     //  error:error =>
            // )
            // console.log(this._v());
        }
    }

    register(){
        // if(this.registerForm.valid) {
        //     console.log(this.registerForm.value);
        // }
    }

    _v() {
        return this.loginForm.value;
    }
}

// submit(){

//     const formData = this.form.getRawValue();
//     const data = {
//         username : formData.email,
//         password: formData.password,
//         grant_type: 'password',
//         client_id: 1 ,
//         client_secret:'1|1X6piJzS4mgUvzyejop0dDPwTjNRCpRnEQzUOtRK',
//         scope: '*'
//     };

//     this.http.post('http://127.0.0.1:8000/api/auth/login', data).subscribe(
//         next: (result:any) => {
//             localStorage.setItem('token', result.access_token);
//             this.router.navigate( ['/''account']);
//          },
//          error:error =>
//     )
// }
