import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
    form: FormGroup;
    constructor(private readonly fb: FormBuilder) {
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, this.validatorPassword]]
      });
    }

    submitForm() {
      console.log(this.form.getRawValue());
    }

    validatorPassword(fc: FormControl) {
      const value = fc.value as string;
      const isInvalid = 'password' === value.trim().toLowerCase();
      return isInvalid ? { passwordError: 'Password is not a strong password'} : null;
    }}
