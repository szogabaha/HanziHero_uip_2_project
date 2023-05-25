import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-languagesetter',
  templateUrl: './languagesetter.component.html',
  styleUrls: ['./languagesetter.component.css'],
})
export class LanguagesetterComponent {

  constructor(private translocoService: TranslocoService) {}
  public languagesList:
    Array<Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>> = [
    {
      imgUrl: '/assets/flags/english.png',
      code: 'en',
      name: 'English',
      shorthand: 'ENG',
    },
    {
      imgUrl: '/assets/flags/german.png',
      code: 'de',
      name: 'Deutsch',
      shorthand: 'GER',
    },
    {
      imgUrl: '/assets/flags/hungarian.png',
      code: 'hu',
      name: 'Magyar',
      shorthand: 'HU',
    },
  ];
  public changeLanguage(target: any): void {
    this.translocoService.setActiveLang(target.value);
  }
}
