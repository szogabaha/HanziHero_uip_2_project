import { Component, HostListener } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settingsProperties = [
    {
      "name": "account",
      "class" : "selected",
      "sectionName": "section-account",
    },
    {
      "name": "change_password",
      "class" : "",
      "sectionName": "section-password",

    },
    {
      "name": "language",
      "class" : "",
      "sectionName": "section-language"
    },
    {
      "name": "notifications",
      "class" : "",
      "sectionName": "section-notifications"
    },
    {
      "name": "sessions",
      "class" : "",
      "sectionName": "section-sessions"
    },
    {
      "name": "delete_profile",
      "class" : "",
      "sectionName": "section-delete"
    }
  ];

  constructor(private translocoService: TranslocoService) {

  }
  @HostListener('window:scroll', ['$event.target'])
  onScroll(scrollableDiv: any): void {

    //Find closest item
    let closestSectionName = '';
    let closestAbsoluteBottom = Infinity;

    this.settingsProperties.forEach((item) => {
      const element = document.getElementById(item.sectionName);
      if (element) {
        const rect = element.getBoundingClientRect();
        const absoluteBottom = rect.bottom;

        if (absoluteBottom < closestAbsoluteBottom && absoluteBottom >=0) {
          closestSectionName = item.name;
          closestAbsoluteBottom = absoluteBottom;
        }
      }
    });

    this.settingsProperties.forEach((item) =>{
      if (item["name"] === closestSectionName) {
        item["class"] = "selected";
      } else {
        item["class"] = "";
      }
    });
  }

  jumpToSection(onClicked: any) {
    const element = document.getElementById(onClicked.sectionName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' , block: 'start'});
    }

    //Timeout is needed because otherwise the delete profile wouldn't be shown, because it's never the
    //closest section if page is wide
    setTimeout(() => {
      this.settingsProperties.forEach((item) => {
        if (item.name === onClicked.name) {
          item["class"] = "selected";
        } else {
          item["class"] = "";
        }
      })
    }, 800);


  }
}
