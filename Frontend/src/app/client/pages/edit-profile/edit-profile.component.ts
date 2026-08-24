import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;

  countriesAndCities:any
  filteredCities = [];


  constructor(private fb: FormBuilder, private clientService: ClientService,
     private router: Router, private authservice: AuthService, private notification:NzNotificationService) { }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      county: [null, Validators.required],
      city: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.oldData();

    this.editProfileForm.get('password')?.valueChanges.subscribe(password => {
      this.editProfileForm.get('checkPassword')?.setValue(password, { emitEvent: false });
    });

    this.authservice.getCountryAndCities().subscribe((res)=>{
      this.countriesAndCities = res;
    })
    
  }

  onCountyChange(selectedCounty: string): void {
    const county = this.countriesAndCities.find(c => c.judet === selectedCounty);
    this.filteredCities = county ? county.orase : [];
    this.editProfileForm.controls['oras'].setValue(null);
  }

  oldData(){
    this.clientService.getUserDetails().subscribe(user => {
      this.editProfileForm.patchValue(user);
    });
  }

  onSubmit(): void {
    const newUserData = {
      id: UserStorageService.getUserId(),
      firstName: this.editProfileForm.get('firstName')?.value,
      lastName: this.editProfileForm.get('lastName')?.value,
      email: this.editProfileForm.get('email')?.value,
      phone: this.editProfileForm.get('phone')?.value,
      county: this.editProfileForm.get('county')?.value,
      city: this.editProfileForm.get('city')?.value,
      password: this.editProfileForm.get('password')?.value,
    };
  
    this.clientService.updateUserProfile(newUserData).subscribe(response => {
      this.notification.success(
        'SUCCESS', 
        `User updated successfully!`, 
        { nzDuration: 5000 }
      );
      this.router.navigate(['/client/dashboard']);
    });
  }
}
  