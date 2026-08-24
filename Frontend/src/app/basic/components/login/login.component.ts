import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { error } from 'node:console';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { runInThisContext } from 'node:vm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(){
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(){

    const userName = this.validateForm.get(['userName'])!.value;
    const password = this.validateForm.get(['password'])!.value;

    if (userName && password) {
        this.authservice.login(userName, password).subscribe(
            res => {
                if(UserStorageService.clientLoggedIn()){
                  this.router.navigateByUrl('client/dashboard');
                }else if(UserStorageService.companyLoggedIn()){
                  
                  this.router.navigateByUrl('company/dashboard');
                }else if(UserStorageService.ownerLoggedIn()){
                  this.router.navigateByUrl('owner/dashboard');
                }
            },
            error => {
                this.notification.error(
                    'ERROR',
                    'Invalid email or password',
                    { nzDuration: 5000 }
                );
            }
        );
    } else {
        this.notification.error(
            'ERROR',
            'Username and password are required',
            { nzDuration: 5000 }
        );
    }

  }

}
