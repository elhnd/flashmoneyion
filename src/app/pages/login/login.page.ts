import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {FormControl,FormGroup,FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  messageError;
  //formGroup: FormGroup;

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  constructor(private auth: AuthenticationService,private _router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    //this.setChangeValidate()
  }

  createForm() {
    //let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'password': [null, [Validators.required, this.checkPassword]]
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getUsername() {
    return this.formGroup.get('username').hasError('required') ? 'Field is required' :'';
      //this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :'';
  }


  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }


  onLogin(){
    this.auth.login(this.formGroup.value)
      .subscribe(resp=>{
        console.log(resp)
        let jwt = resp.body['token'];
        this.auth.saveToken(jwt); 
      }),err=>{
        this.messageError = err
        console.log(this.messageError)
      }
  }
//------------------------------
}
