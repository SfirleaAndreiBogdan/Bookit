import { Component, HostListener } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './client/services/client.service';
import { AiAssistantServiceService } from './ai-assistant/serviceAI/ai-assistant-service.service';
import { HttpClient } from '@angular/common/http';
import { ReviewDialogComponent } from './client/pages/review-dialog/review-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookit-web';
  menuOpen:boolean;
  clientLoggedIn: boolean = UserStorageService.clientLoggedIn();
  companyLoggedIn: boolean = UserStorageService.companyLoggedIn();
  ownerLoggedIn: boolean = UserStorageService.ownerLoggedIn();

  constructor(private clientService:ClientService,private router: Router, private activatedRoute:ActivatedRoute,
              private apiService:AiAssistantServiceService, private http:HttpClient,public dialog: MatDialog){}

  ngOnInit(){
      this.router.events.subscribe(event =>{
        this.clientLoggedIn = UserStorageService.clientLoggedIn();
        this.companyLoggedIn = UserStorageService.companyLoggedIn();
        this.ownerLoggedIn = UserStorageService.ownerLoggedIn();
        this.menuOpen = false;
      })
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.action')) {
      this.menuOpen = false;  
    }
  }
  logout(){
    UserStorageService.signout();
    this.router.navigateByUrl('login');
    this.menuOpen = false;
  }
  openReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      height: '400px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
