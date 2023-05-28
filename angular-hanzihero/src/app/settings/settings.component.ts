import { Component, HostListener, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
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

  username = "";
  email = "";
  oldPassword = "";
  newPassword = "";
  confirmNewPassword = "";
  receiveNotifications = false;
  sessionLength = 0;
  language : any;
  deleteConfirm = "";
  notificationPeriod = 0;

  saveChangesClass = "save-changes"

  constructor(private translocoService: TranslocoService, private authService: AuthService) {
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser()
    if (user) {
      this.username = user.userName;
      this.email = user.email;
      this.receiveNotifications = user.reminder;
      this.sessionLength = user.sessionLength;
      this.language = user.studyLanguage;
      this.notificationPeriod = 5; //TODO currently not using this
    }

  }

  onUsernameChange(target: any) {
    if (!target) {
      return
    }
    const newUsername = target.value
    console.log(newUsername)
    //TODO, what to do with it
  }

  onLanguageChange(target: any) {
    if(!target) {
      return
    }
    this.language = target.originalTarget.id;
  }

  getLanguageImageClass(id: string) {

    if (id === this.language) {
      return "";
    } else return "semitransparent"
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
