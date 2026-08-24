import { Component } from '@angular/core';
import { AiAssistantServiceService } from './serviceAI/ai-assistant-service.service';
import { HomePageService } from '../home-page/service/home-page.service';
import { TranslateService } from '@ngx-translate/core';
import { UserStorageService } from '../basic/services/storage/user-storage.service';
import { ClientService } from '../client/services/client.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AiAssistantComponent {
  userSelection: string = '';
  aiResponse: { text: string, isUser: boolean, isTyping?: boolean }[] = [];
  chatOpen = false;
  isAiTyping = false;
  bookingsData: any;
  reviewsData:  any[] = [];
  reservationsData: any[] = [];
  facilities: any;

  constructor(
    private apiService: AiAssistantServiceService,
    private homePageService: HomePageService,
    private translate: TranslateService,
    private clientService: ClientService
  ) {}

  toggleChat() {
    this.chatOpen = !this.chatOpen;

    if (this.chatOpen) {
      this.aiResponse.push({
        text: this.translate.instant('assistant.welcomeMessage'),
        isUser: false
      });
    } else {
      this.aiResponse.push({
        text: this.translate.instant('assistant.goodbyeMessage'),
        isUser: false
      });
    }
  }

  sendMessage() {
  const mesaj = this.userSelection.trim();
  if (!mesaj) return;

  this.aiResponse.push({
    text: mesaj,
    isUser: true
  });

  this.isAiTyping = true;
  this.aiResponse.push({
    text: '',
    isUser: false,
    isTyping: true
  });

  const isBookingOrReviewRelated = this.getMessageContext(mesaj);

  if (isBookingOrReviewRelated) {
    this.homePageService.getAllBookings().subscribe((bookings) => {
      this.bookingsData = bookings;

      const allFacilityIds: string[] = Array.from(
        new Set(
        bookings.flatMap(booking => (booking.facilitiesIds || []) as string[])
              )
      );

      this.homePageService.getFacilitiesByBooking(allFacilityIds).subscribe((facilities) => {
        this.facilities = facilities;

        this.bookingsData = this.bookingsData.map(booking => {
          const facilityObjects = (booking.facilitiesIds || []).map(id =>
            this.facilities.find(f => f.id === id)
          ).filter(f => f !== undefined);
          return {...booking, facilities: facilityObjects};
        });

        const reviewRequests = bookings.map(booking =>
          this.homePageService.getBookingsByReviewId(booking.id)
        );
        const reservationRequests = bookings.map(booking =>
          this.clientService.getReservationByRoomId(booking.id).pipe(
            map(reservation => reservation || [])
          )
        );

        forkJoin([
          forkJoin(reviewRequests),
          forkJoin(reservationRequests)
        ]).subscribe({
          next: ([allReviews, allReservations]: [any[][], any[][]]) => {
            this.reviewsData = allReviews.flat();
            this.reservationsData = allReservations.flat();

            this.apiService.sendMessageWithData(
              mesaj,
              this.bookingsData,
              this.reviewsData,
              this.reservationsData
            ).subscribe({
              next: (res) => {
                const raspuns = res.content && res.content[0]?.text ? res.content[0].text : 'Răspuns nevalid.';
                this.aiResponse[this.aiResponse.length - 1] = {
                  text: raspuns,
                  isUser: false,
                  isTyping: false
                };
                this.isAiTyping = false;
              },
              error: (err) => {
                console.error('Eroare la comunicare cu backendul:', err);
                this.isAiTyping = false;
                this.aiResponse[this.aiResponse.length - 1] = {
                  text: 'A apărut o eroare. Încearcă din nou.',
                  isUser: false
                };
              }
            });
          },
          error: (err) => {
            console.error('Eroare la încărcarea datelor:', err);
            this.isAiTyping = false;
            this.aiResponse[this.aiResponse.length - 1] = {
              text: 'Eroare la încărcarea datelor.',
              isUser: false
            };
          }
        });

      }, (error) => {
        // eroare la încărcarea facilităților
        console.error('Eroare la încărcarea facilităților:', error);
        this.isAiTyping = false;
        this.aiResponse[this.aiResponse.length - 1] = {
          text: 'Eroare la încărcarea facilităților.',
          isUser: false
        };
      });
    });
  } else {
    this.apiService.sendMessage(mesaj).subscribe({
      next: (res) => {
        const raspuns = res.content && res.content[0]?.text ? res.content[0].text : 'Răspuns nevalid.';
        this.aiResponse[this.aiResponse.length - 1] = {
          text: raspuns,
          isUser: false,
          isTyping: false
        };
        this.isAiTyping = false;
      },
      error: (err) => {
        console.error('Eroare la comunicare cu backendul:', err);
        this.isAiTyping = false;
        this.aiResponse[this.aiResponse.length - 1] = {
          text: 'A apărut o eroare. Încearcă din nou.',
          isUser: false
        };
      }
    });
  }

  this.userSelection = '';
}

  
  

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();  
      this.sendMessage();      
    }
  }


  getMessageContext(message: string): 'booking' | 'business' | 'general' {
  const lowerMsg = message.toLowerCase();

  const bookingKeywords = [
    'rezervare', 'rezervări', 'book', 'booking', 'review', 'recenzie', 'evaluare', 'feedback',
    'camera', 'camere', 'tipuri de camere', 'camere disponibile', 'preț camere', 'detalii cameră',
    'capacitate', 'disponibilitate', 'perioadă de cazare', 'cazare', 'facilități cameră',
    'anulez rezervarea', 'confirmare rezervare', 'modificare rezervare'
  ];

  const businessKeywords = [
    'venituri', 'venit', 'profit', 'pierderi', 'creștere', 'scădere', 'strategie financiară', 'companie', 'firma',
    'analiză financiară', 'investiții', 'investitori', 'monetizare', 'model de afacere', 'plan de afaceri',
    'cifra de afaceri', 'tranzacții', 'raport financiar', 'cheltuieli', 'buget', 'estimări',
    
    'proprietar', 'proprietate', 'apartamentul meu', 'gestionez', 'administrez', 'camerele mele',
    'rezervările mele', 'veniturile mele', 'situația mea financiară', 'raportul meu', 'statistici personale',
    'performanța mea', 'profitul meu', 'câștigurile mele'
  ];

  if (bookingKeywords.some(keyword => lowerMsg.includes(keyword))) {
    return 'booking';
  }

  if (businessKeywords.some(keyword => lowerMsg.includes(keyword))) {
    return 'business';
  }

  return 'general';
}

  
}
