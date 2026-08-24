import { Component, HostListener } from '@angular/core';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'] // FIX: era "styleUrl"
})
export class LanguageSwitcherComponent {
  dropdownOpen = false;

  constructor(private translationService: TranslationService) {}

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !targetElement.closest('.language-switcher')) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  switchLanguage(language: string) {
    this.translationService.changeLanguage(language);
    localStorage.setItem('language', language);
    this.dropdownOpen = false;
  }
}
