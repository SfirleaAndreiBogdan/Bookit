import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

function passwordChecker(control: any){

  if (!control.parent) {
    return null;
  }

  const passw = control.parent.get('password');
  const chPassw = control.parent.get('checkPassword');

    if (!passw.value || !chPassw.value) {
      return null;
    }

  if(passw.value !== chPassw.value){
      return {passwordMismatch: true};
    }
    return null;
}

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.scss']
})
export class SignupClientComponent implements OnInit {

  validateForm!: FormGroup;

  filteredCities = [];

  countriesAndCities:any

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private notification: NzNotificationService,
              private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]{2,}$')]],
      lastName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]{2,}$')]],
      phone: [null, [Validators.pattern('^[0-9]{10,15}$')]],
      password: [null, [Validators.required,Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]],
      checkPassword: [null, [Validators.required,passwordChecker]],
      county: [null, [Validators.required]],
      city: [null, [Validators.required]] 
    });
    this.authservice.getCountryAndCities().subscribe((res)=>{
      this.countriesAndCities = res;
    })
  }

  onCountyChange(selectedCounty: string): void {
    const county = this.countriesAndCities.find(c => c.county === selectedCounty);
    this.filteredCities = county ? county.city : [];
    this.validateForm.controls['city'].setValue(null);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authservice.registerClient(this.validateForm.value).subscribe(
        res => {
          this.notification.success(
            'SUCCESS',
            'Signup successful',
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl("/login");
        },
        error => {
          this.notification.error(
            'ERROR',
            'Signup failed',
            { nzDuration: 5000 }
          );
        }
      );
    }else {
      this.notification.error('ERROR', 'Please complete all fields correctly', { nzDuration: 5000 });
    }
  }
}
