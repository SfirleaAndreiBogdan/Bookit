import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private facilityTranslations: { [key: string]: string } = {
  'Minibar': 'Minibar',
  'Safe': 'Seif',
  'Sea View': 'Vedere la mare',
  'Garden View': 'Vedere la grădină',
  'Coffee Machine': 'Espressor pentru cafea',
  'Work Desk': 'Birou de lucru',
  'Room Service': 'Room service',
  'Bathtub': 'Cadă',
  'Heating': 'Încălzire',
  'Soundproof': 'Izolare fonică',
  'Swimming Pool': 'Piscină',
  'Gym': 'Sală de fitness',
  'Spa & Wellness Center': 'Centru Spa & Wellness',
  'Parking': 'Parcare',
  'Restaurant': 'Restaurant',
  'Bar': 'Bar',
  'Pets Allowed': 'Animale de companie permise',
  'Conference Room': 'Sală de conferințe',
  'Airport Shuttle': 'Transfer de la/la aeroport',
  'Laundry Service': 'Servicii de spălătorie',
  'Playground': 'Loc de joacă',
  '24/7 Reception': 'Recepție 24/7',
  'Luggage Storage': 'Depozitare bagaje',
  'Elevator': 'Lift',
  'Terrace': 'Terasă',
  'Air Conditioning': 'Aer condiționat',
  'Free Wi-Fi': 'WiFi gratuit',
  'TV': 'Televizor',
  'Private Bathroom': 'Baie privată',
  'Balcony': 'Balcon'
};

private facilityDescriptionTranslations: { [key: string]: string } = {
  'Cool down your room with air conditioning.': 'Răcorește camera cu aer condiționat.',
  'High-speed wireless internet connection available.': 'Conexiune Wi-Fi de mare viteză disponibilă.',
  'Flat-screen TV with satellite channels.': 'Televizor cu ecran plat și canale prin satelit.',
  'En-suite bathroom with shower and toiletries.': 'Baie privată cu duș și articole de toaletă.',
  'Private balcony with a scenic view.': 'Balcon privat cu vedere panoramică.',
  'Small fridge with refreshments and snacks.': 'Frigider mic cu băuturi și gustări.',
  'Secure your valuables with a room safe.': 'Păstrează obiectele de valoare în siguranță cu un seif în cameră.',
  'Enjoy stunning views of the sea from your room.': 'Bucură-te de priveliști uimitoare spre mare din cameră.',
  'Relax with a peaceful garden view.': 'Relaxează-te cu o vedere liniștită spre grădină.',
  'Enjoy fresh coffee at any time in your room.': 'Savurează cafea proaspătă oricând în cameră.',
  'Spacious desk for business travelers.': 'Birou spațios pentru călătorii de afaceri.',
  'Order food and drinks directly to your room.': 'Comandă mâncare și băuturi direct în cameră.',
  'Relax in a luxurious bathtub.': 'Relaxează-te într-o cadă luxoasă.',
  'Keep your room warm during cold seasons.': 'Păstrează camera caldă în sezonul rece.',
  'Soundproof rooms for better rest.': 'Camere izolate fonic pentru un somn odihnitor.',
  'Access to outdoor or indoor swimming pool.': 'Acces la piscină interioară sau exterioară.',
  'Modern fitness center available for guests.': 'Sală de fitness modernă disponibilă pentru oaspeți.',
  'Relax with spa treatments and wellness services.': 'Relaxează-te cu tratamente spa și servicii de wellness.',
  'Free private parking for guests.': 'Parcare privată gratuită pentru oaspeți.',
  'Enjoy drinks and cocktails at the hotel bar.': 'Savurează băuturi și cocktailuri la barul hotelului.',
  'Pets are welcome at this property.': 'Animalele de companie sunt binevenite la această proprietate.',
  'Facilities for meetings and conferences.': 'Facilități pentru întâlniri și conferințe.',
  'Transport service to and from the airport.': 'Serviciu de transport de la/la aeroport.',
  'Professional laundry and dry cleaning services.': 'Servicii profesionale de spălătorie și curățătorie chimică.',
  'Outdoor play area for children.': 'Zonă de joacă în aer liber pentru copii.',
  'Reception available at any hour.': 'Recepție disponibilă 24/7.',
  'Secure storage for your bags.': 'Depozitare sigură pentru bagaje.',
  'Elevator access to all floors.': 'Acces cu liftul la toate etajele.',
  'Large outdoor terrace for relaxation.': 'Terasă exterioară spațioasă pentru relaxare.'
};


  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ro');
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

translateFacilityDescription(description: string): string {
  const currentLang = this.translate.currentLang || this.translate.getDefaultLang();

  if (currentLang === 'ro') {
    return this.facilityDescriptionTranslations[description] || description;
  } else {
    return description;
  }
}

translateInstant(key: string): string {
  return this.translate.instant(key);
}


  translateFacility(name: string): string {
    const currentLang = this.translate.currentLang || this.translate.getDefaultLang();

    if (currentLang === 'ro') {
      return this.facilityTranslations[name] || name;
    } else {
      return name;
    }
  }

  translateStatus(status: string): string {
    const translations: { [key: string]: string } = {
      'PENDING': this.translate.instant('status.pending'),
      'APPROVED': this.translate.instant('status.approved'),
      'REJECTED': this.translate.instant('status.rejected'),
      'CANCELED': this.translate.instant('status.canceled')
    };
    return translations[status] || status;
  }


}
