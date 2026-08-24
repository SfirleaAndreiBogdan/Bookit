import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../../company/services/company.service';
import { OwnerService } from '../../services/owner.service';
import { RoomType } from '../../../company/pages/components/room-type.enum';
import { TranslationService } from '../../../components/language-switcher/translation.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent {

  selectedFiles: File[] = [];
  imagePrivide: string[] = [];
  validateForm!: FormGroup;
  IsPetAllowed: false;
  facilities;
  roomTypes = Object.values(RoomType);
  previewFiles: string[] = [];
  
  countiesWithCities: any;
  filteredCities: any[] = [];
  selectedCounty: any = null;
  selectedCity: any = null;

  constructor(
    private fb: FormBuilder, 
    private notification: NzNotificationService, 
    private router: Router,
    private companyService: CompanyService,
    private ownerService: OwnerService,
    private translationService: TranslationService
  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      selectedCounty: ['', Validators.required],
      selectedCity: ['', Validators.required],
      numberOfAdults: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
      numberOfChildren: [0, [Validators.min(0), Validators.max(10)]],
      numberOfRooms: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
      petAllowed: [false],
      selectedRoomType: ['',Validators.required],
      facilities: [[], Validators.required]
    });
    this.loadCountyAndCities(); 
    this.getFacilities();   
  }

  getFacilities(){
    this.companyService.getFacilities().subscribe((res)=>{
      this.facilities = res;
    })
  }

  onCountyChange(): void {
    const selectedCounty = this.validateForm.get('selectedCounty')?.value;
  
  if (selectedCounty) {
    this.validateForm.get('selectedCity')?.enable();
    this.filteredCities = selectedCounty.city.map(city => ({ name: city }));
  } else {
    this.validateForm.get('selectedCity')?.disable(); 
    this.validateForm.get('selectedCity')?.setValue(null); 
  }
  }


  loadCountyAndCities() {
    this.companyService.getCountryAndCities().subscribe((res) => {
      if (Array.isArray(res)) {
        this.countiesWithCities = res;
      } else {
        console.error("Unexpected API response format:", res);
      }
    });
  }


  deleteImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imagePrivide.splice(index, 1);
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!this.selectedFiles.some(f => f.name === file.name)) {
        this.selectedFiles.push(file);
        this.createImagePreview(file);
      }
    }
    this.fileInput.nativeElement.value = '';
  }

  createImagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrivide.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }


  
  createBooking() {
    if (!this.selectedFiles) {
      this.notification.error(
        'ERROR',
        'Te rugăm să selectezi o imagine!',
        { nzDuration: 5000 }
      );
      return;
    }

    const formData: FormData = new FormData();
    if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file) => {
          formData.append('images', file, file.name);
        });
    }

    formData.append('name', this.validateForm.get('name')!.value);
    formData.append('description', this.validateForm.get('description')!.value);
    formData.append('price', this.validateForm.get('price')!.value);
    formData.append('county', this.validateForm.get('selectedCity')!.value?.name);
    formData.append('city', this.validateForm.get('selectedCounty')!.value?.county);
    formData.append('numberOfAdults', this.validateForm.get('numberOfAdults')!.value);
    formData.append('numberOfChildren', this.validateForm.get('numberOfChildren')!.value);
    formData.append('numberOfRooms', this.validateForm.get('numberOfRooms')!.value);
    formData.append('petAllowed', this.validateForm.get('petAllowed')!.value);
    formData.append('roomType', this.validateForm.get('selectedRoomType')!.value);
    formData.append('facilities', this.validateForm.get('facilities')!.value);


    this.companyService.createBooking(formData).subscribe(
      res => {
        if (res.success) {
          this.notification.success('SUCCESS', res.message, { nzDuration: 5000 });
          this.router.navigateByUrl('/company/posts');
        } else {
          this.notification.error('ERROR', res.message, { nzDuration: 5000 });
        }
      },
      error => {
        this.notification.error('ERROR', 'An error occurred during booking creation', { nzDuration: 5000 });
      }
    );
  }
  translateFacility(name: string): string {
    return this.translationService.translateFacility(name);
  }

}
