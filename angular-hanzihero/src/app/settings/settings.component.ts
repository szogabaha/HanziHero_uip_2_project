import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settingsProperties = [
    {
      "name": "Account",
      "class" : "selected",
      "sectionName": "section-account",
    },
    {
      "name": "Change password",
      "class" : "",
      "sectionName": "section-password",

    },
    {
      "name": "Language",
      "class" : "",
      "sectionName": "section-language"
    },
    {
      "name": "Notifications",
      "class" : "",
      "sectionName": "section-notifications"
    },
    {
      "name": "Sessions",
      "class" : "",
      "sectionName": "section-sessions"
    }
  ];

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
}
