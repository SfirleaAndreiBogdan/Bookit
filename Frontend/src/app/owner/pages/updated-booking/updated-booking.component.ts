import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../../company/services/company.service';
import { OwnerService } from '../../services/owner.service';
import { TranslationService } from '../../../components/language-switcher/translation.service';
import { RoomType } from '../../../company/pages/components/room-type.enum';


@Component({
  selector: 'app-updated-booking',
  templateUrl: './updated-booking.component.html',
  styleUrl: './updated-booking.component.scss'
})
export class UpdatedBookingComponent implements OnInit{

  roomId:any

  selectedFiles: File[] = [];
  imagePrivide: string[] = [];
  validateForm!: FormGroup;
  IsPetAllowed: false;
  county: string;
  city: string;
  countiesWithCities: any;
  filteredCities: any[] = [];
  roomTypes = Object.values(RoomType);
  facilities;
  previewFiles: string[] = [];
  
    constructor(
      private fb: FormBuilder, 
      private notification: NzNotificationService, 
      private router: Router,
      private companyService: CompanyService,
      private activatedRoute : ActivatedRoute,
      private translationService: TranslationService
    ) {}
  
    ngOnInit() {
      this.validateForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        description: ['', Validators.required],
        selectedCounty: [this.county, Validators.required],
        selectedCity: [this.city, Validators.required],
        numberOfAdults: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
        numberOfChildren: [0, [Validators.min(0), Validators.max(10)]],
        numberOfRooms: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
        petAllowed: [false],
        selectedRoomType: ['',Validators.required],
        facilities: [[],Validators.required]
      }); 
      this.getFacilities();
      this.roomId = this.activatedRoute.snapshot.params['id'];
      this.getBookingDetails();
    }
  
    onCountyChange(): void {
      const selectedCountyName = this.validateForm.get('selectedCounty')?.value;

      if (selectedCountyName) {
        const selectedCounty = this.countiesWithCities.find(
          county => county.county === selectedCountyName
        );

        if (selectedCounty) {
          this.filteredCities = selectedCounty.city.map(city => ({ name: city }));
          this.validateForm.get('selectedCity')?.enable();
        } else {
          this.filteredCities = [];
          this.validateForm.get('selectedCity')?.disable();
          this.validateForm.get('selectedCity')?.setValue(null);
        }
      } else {
        this.filteredCities = [];
        this.validateForm.get('selectedCity')?.disable();
        this.validateForm.get('selectedCity')?.setValue(null);
      }
    }

  
  
    getFacilities(){
      this.companyService.getFacilities().subscribe((res)=>{
        this.facilities = res;
      })
    }
  
    deleteImage(index: number) {
      this.selectedFiles.splice(index, 1);
      this.previewImages();
    }

  
    onFileSelected(event: any) {
      if (!event.target.files || event.target.files.length === 0) {
        this.notification.error(
          'ERROR',
          'Nu ai selectat nici o imagine!',
          { nzDuration: 5000 }
        );
        return;
      }
      
      const files: FileList = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
    
        if (!this.selectedFiles.some(f => f.name === file.name)) {
          this.selectedFiles.push(file);
        }
      }
      this.previewImages();
    }
  
    previewImages() {
      this.imagePrivide = [];
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePrivide.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }


  
  getBookingDetails() {
    this.companyService.getRoomById(this.roomId).subscribe((res) => {
      const facilityIds = res.facilityDetails.map(facility => facility.id);

      if (res.imgUrls && Array.isArray(res.imgUrls)) {
        res.imgUrls.forEach((img, index) => {
          const base64 = `data:image/jpeg;base64,${img}`;
          const file = this.base64ToFile(base64, `old-image-${index}.jpg`);
          this.selectedFiles.push(file);
        });
        this.previewImages();
      }

      this.companyService.getCountryAndCities().subscribe((allCounties) => {
        this.countiesWithCities = allCounties;

        let matchedCounty = null;
        let matchedCity = null;

        for (const county of allCounties) {
          if (county.county?.toLowerCase() === res.city?.toLowerCase()) {
            matchedCounty = county;

            for (const city of county.city || []) {
              if (city?.toLowerCase() === res.county?.toLowerCase()) {
                matchedCity = city;
                break;
              }
            }

            break;
          }
        }
        this.validateForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          selectedCounty: matchedCounty?.county,
          selectedCity: matchedCity,
          numberOfAdults: res.numberOfAdults,
          numberOfChildren: res.numberOfChildren,
          numberOfRooms: res.numberOfRooms,
          petAllowed: res.petAllowed,
          selectedRoomType: res.roomType,
          facilities: facilityIds
        });
        this.onCountyChange();
      });
  },
  (error) => {
    this.notification.error('ERROR', 'Failed to fetch booking details', { nzDuration: 5000 });
  });
}

    
    updateBooking() {
  
      const formData: FormData = new FormData();
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file) => {
          formData.append('images', file, file.name);
        });
      }
      formData.append('name', this.validateForm.get('name')!.value);
      formData.append('description', this.validateForm.get('description')!.value);
      formData.append('price', this.validateForm.get('price')!.value);
      formData.append('county', this.validateForm.get('selectedCity')!.value);
      formData.append('city', this.validateForm.get('selectedCounty')!.value);
      formData.append('numberOfAdults', this.validateForm.get('numberOfAdults')!.value);
      formData.append('numberOfChildren', this.validateForm.get('numberOfChildren')!.value);
      formData.append('numberOfRooms', this.validateForm.get('numberOfRooms')!.value);
      formData.append('petAllowed', this.validateForm.get('petAllowed')!.value);
      formData.append('roomType', this.validateForm.get('selectedRoomType')!.value);
      formData.append('facilities', this.validateForm.get('facilities')!.value);

      this.companyService.updateBooking(this.roomId,formData).subscribe(
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


  getRoomId(){
    this.companyService.getRoomById(this.roomId).subscribe(res=>
    {
      this.validateForm.patchValue(res);
      this.imagePrivide = res.imgUrls.map(img => 'data:image/jpeg;base64,' + img);
      
    }
    )
  }

  translateFacility(name: string): string {
    return this.translationService.translateFacility(name);
  }

  base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}
