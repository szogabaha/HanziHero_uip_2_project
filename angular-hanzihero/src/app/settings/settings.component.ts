/**
 * File: settings.component.ts
 * The controller logic for the settings view
 *
 * Author: Gabor Szolnok
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  //Settings options to show on the left with the corresponding class.
  //The class indicates which one gets a different styling
  settingsProperties = [
    {
      "name": "account",
      "class" : "selected", //Top of the page -> selected by default
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

  //Form input variables
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

  //Error message indicators
  reservedUsername = false;
  reservedEmail = false;
  emptyField = false;
  wrongOldPassword = false;
  nonMatchingPassword = false;
  badNotificationInput = false;
  badSessionInput = false;
  wrongDeleteProfilePassword = false;

  //Inject dependencies
  //
  constructor(private router: Router, private authService: AuthService) {
  }

  //Set up default values for form inputs
  //
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

  //Change flag transparency based on which language is selected
  //
  onLanguageChange(target: any) {
    if(!target) {
      return
    }
    if(target.target) {
      this.language = target.target.id;
    } else if(target.originalTarget) {
      this.language = target.originalTarget.id;
    }
  }

  //Get which language is selected
  getLanguageImageClass(id: string) {

    if (id === this.language) {
      return "";
    } else return "semitransparent"
  }

  //Update the left side if the right side is scrolled
  //
  @HostListener('window:scroll', ['$event.target'])
  onScroll(scrollableDiv: any): void {

    //Find closest section name
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

    //Set the found section to selected, remove the selected class from the other sections
    this.settingsProperties.forEach((item) =>{
      if (item["name"] === closestSectionName) {
        item["class"] = "selected";
      } else {
        item["class"] = "";
      }
    });
  }

  //Scroll right side if an item is clicked on the left side
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

  //Number input validation
  private canBeParsedToNumber(value: any): boolean {
    return !(!value || isNaN(Number(value)) || Number(value) < 0 || !Number.isInteger(Number(value)))
  }



  //update model if save changes is clicked
  saveChanges() {

    //Validation checks
    this.emptyField = !this.username || !this.email
    this.wrongOldPassword = (this.oldPassword != "" || this.confirmNewPassword != "" || this.newPassword != "") && this.oldPassword !== this.authService.getCurrentUser()?.password
    this.nonMatchingPassword = this.confirmNewPassword !== this.newPassword
    this.badNotificationInput = this.receiveNotifications && !this.canBeParsedToNumber(this.notificationPeriod)
    this.badSessionInput = !this.canBeParsedToNumber(this.sessionLength)

    //Update those fields that have been changed in the form
    if (!this.emptyField) {
      this.authService.updateCurrentUser(this.username,this.email)
    }

    //Language is always updated
    this.authService.updateCurrentUser(undefined, undefined, undefined, undefined, this.language)

    if(this.newPassword && !this.wrongOldPassword && !this.nonMatchingPassword) {
      this.authService.updateCurrentUser(undefined, undefined, this.newPassword)
    }
    if(!this.badNotificationInput) {
      this.authService.updateCurrentUser(undefined, undefined, undefined, undefined, undefined, this.receiveNotifications)
    }
    if(!this.badSessionInput) {
      this.authService.updateCurrentUser(undefined, undefined, undefined, this.sessionLength)
    }

    //Return user to dashboard if all validations passed and changes are saved
    if(!this.emptyField && !this.wrongOldPassword && !this.nonMatchingPassword && !this.badNotificationInput && !this.badSessionInput) {
      this.router.navigate(['/dashboard'])
    }

 }

 //Delete account if the button is clicked and the correct password is given
 //
 deleteAccount() {
    //Validation check
    if(this.deleteConfirm !== this.authService.getCurrentUser()?.password) {
      this.wrongDeleteProfilePassword = true;
      return
    }
    this.authService.deleteCurrentAccount();
    this.router.navigate(['/login'])
 }
}


/************
// END of settings.component.ts
//************/
