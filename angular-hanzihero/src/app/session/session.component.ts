/*
File: session.component.ts
author: Darian Krummrich
*/


import { Component, ViewChildren, Input } from '@angular/core';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Deck, Card, LearningStatus} from '../model/content'
import {User} from '../model/user';
import { TranslocoService } from '@ngneat/transloco';




@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})

export class SessionComponent {
  // controls for when to show which view, panel, button set etc.
  // when trying to navigate back to dashboard
  showReminder?: Boolean = false;

  // different views & their buttons
  showForeground?: Boolean = true;
  showBackground?: Boolean = false;
  showBackgroundIcons?: Boolean = true;
  showSentence?: Boolean = false;
  showSides?: Boolean = false;

  //after marking a card as (in-)correct, show encouragement
  showIncorrectNote?: Boolean = false;
  showCorrectNote?: Boolean = false;

  // help messages
  showForegroundHelper?: Boolean = false;
  showBackgroundHelper?: Boolean = false;
  showSentenceHelper?: Boolean = false;

  // progress bar
  progress: number = 0;

  // cards marked as correct or incorrect
  yes?: any;
  no?: any;
  currentCard?: Card[];
  correctItems: Card[] = [];
  incorrectItems: Card[] = [];

  // iterate through helper messages
  curFHelperMessage: number = 0;
  curBHelperMessage: number = 0;
  curSHelperMessage: number = 0;

  foregroundHelperMessages: any[] = [
    this.translocoService.translate("help1b"),
    this.translocoService.translate("help1c"),
    this.translocoService.translate("help1d")
  ]


  backgroundHelperMessages: any[] = [
    this.translocoService.translate("help2b"),
    this.translocoService.translate("help2c"),
    this.translocoService.translate("help2d")
  ]

  sentenceHelperMessages: any[] = [
    this.translocoService.translate("help3b"),
    this.translocoService.translate("help3c")

  ]

  // length of helper message arrays
  f_message_max_length = Object.keys(this.foregroundHelperMessages).length;
  b_message_max_length = Object.keys(this.backgroundHelperMessages).length;
  s_message_max_length = Object.keys(this.sentenceHelperMessages).length;


  // set up media queries for the help message animation
  max_width_2200:any = window.matchMedia("(max-width:2200px)");
  max_width_1800:any = window.matchMedia("(max-width:1800px)");
  max_width_1500:any = window.matchMedia("(max-width:1500px)");
  max_width_1300:any = window.matchMedia("(max-width:1300px)");
  max_width_1000:any = window.matchMedia("(max-width:1000px)");
  max_width_600:any = window.matchMedia("(max-width:600px)");
  max_width_450:any = window.matchMedia("(max-width:450px)");

  min_height_850:any = window.matchMedia("(min-height: 850px)");
  max_height_850:any = window.matchMedia("(max-height: 850px)");
  max_height_600:any = window.matchMedia("(max-height: 600px)");
  max_height_400:any = window.matchMedia("(max-height: 400px)");

  constructor(private router: Router, private translocoService: TranslocoService){}

  ngOnInit(): void{
  }

  /* ============================== switching between views ============================ */
  toggleForegroundB(): void {
    this.showForeground = !this.showForeground;
  }

  // delayed hiding of foreground to allow time for flip
  slowForegroundB(): void{
    setTimeout(()=>{
      this.showForeground = !this.showForeground;
    },1000);
  }

  showForegroundB(): void {
    this.showForeground = true;
  }

  hideForegroundB(): void {
    this.showForeground = false;
  }

  toggleBackgroundB(): void {
    this.showBackground = !this.showBackground;

  }

  // delayed showing of background to allow time for flip
  slowBackgroundB(): void{
    setTimeout(()=>{
      this.showBackground = !this.showBackground;
      const background_card = document.getElementById('background');
      if(background_card){
        background_card.setAttribute("style", "rotate: unset");
      }
    },1000);
  }

  hideBackgroundB(): void {
    this.showBackground = false;
  }

  toggleSentenceB(): void {
    this.showSentence = !this.showSentence;
  }

  hideSentenceB(): void{
    this.showSentence = false;
  }

  toggleShowSides(): void {
    this.showSides = !this.showSides;
  }

  toggleReminder(): void {
    this.showReminder = !this.showReminder;
  }

  toggleIncorrectNote(): void{
    this.showIncorrectNote = !this.showIncorrectNote;
  }

  toggleCorrectNote(): void{
    this.showCorrectNote = !this.showCorrectNote;
  }

  toggleForegroundHelper(): void{
    this.showForegroundHelper = !this.showForegroundHelper;
  }

  hideForegroundHelper(): void {
    this.showForegroundHelper = false;
    this.FHelpReset();
  }

  toggleBackgroundHelper(): void{
    this.showBackgroundHelper = !this.showBackgroundHelper;
  }

  hideBackgroundHelper(): void{
    this.showBackgroundHelper = false;
    this.BHelpReset();
  }

  toggleSentenceHelper(): void{
    this.showSentenceHelper = !this.showSentenceHelper;
  }

  hideSentenceHelper(): void{
    this.showSentenceHelper = false;
    this.SHelpReset();
  }

  /* ====================== displaying & iterating through help messages =================== */

  displayForegroundHelpMessage(): void{
    const foreground_helper = document.getElementById('f_h_m');
    if(foreground_helper){
      foreground_helper.innerText = this.foregroundHelperMessages[this.curFHelperMessage];
    }
  }

  displayBackgroundHelpMessage(): void{
    const background_helper = document.getElementById('b_h_m');
    if(background_helper){
      background_helper.innerText = this.backgroundHelperMessages[this.curBHelperMessage];
    }
  }

  displaySentenceHelpMessage(): void{
    const sentence_helper = document.getElementById('s_h_m');
    if(sentence_helper){
      sentence_helper.innerText = this.sentenceHelperMessages[this.curSHelperMessage];
    }
  }

  nextFHelpMessages(): void{
    // wrap around array if reaching end
    if(this.curFHelperMessage == this.f_message_max_length){
      this.toggleForegroundHelper();
      this.FHelpReset();

    } else{
      this.ForegroundHand();
      this.displayForegroundHelpMessage();
      this.curFHelperMessage = this.curFHelperMessage + 1;
    }
  }

  // reset foreground help messages on clicking away from the view
  FHelpReset(): void{
    this.curFHelperMessage = 0;
    const foreground_helper = document.getElementById('f_h_m');
    if(foreground_helper){
      foreground_helper.innerText = "Click on the card to reveal the hanzi's meaning.";
    }
  }

  nextBHelpMessages(): void{
    if(this.curBHelperMessage == this.b_message_max_length){
      this.toggleBackgroundHelper();
      this.BHelpReset();

    } else{
      // show the side panels as an explanation
      if(this.curBHelperMessage == 0){
      } else if (this.curBHelperMessage == 2){
        this.showSides = false;
      }
      this.BackgroundHand();
      this.displayBackgroundHelpMessage();
      this.curBHelperMessage = this.curBHelperMessage + 1;
    }
  }

  // reset background help messages on clicking away from the view
  BHelpReset(): void{
    this.curBHelperMessage = 0;
    const background_helper = document.getElementById('b_h_m');
    if(background_helper){
      background_helper.innerText = "Drag the card to the sides to mark it as correct or incorrect.";
    }
  }

  nextSHelpMessages(): void{
    if(this.curSHelperMessage == this.s_message_max_length){
      this.toggleSentenceHelper();
      this.SHelpReset();

    } else{
      this.SentenceHand();
      this.displaySentenceHelpMessage();
      this.curSHelperMessage = this.curSHelperMessage + 1;
    }
  }

  SHelpReset(): void {
    this.curSHelperMessage = 0;
    const sentence_helper = document.getElementById('s_h_m');
    if(sentence_helper){
      sentence_helper.innerText = "The card displays example sentences both as pinyin and in English.";
    }
  }


  // foreground card slowly rotates and then is hidden after 1 second.
  // background is displayed after one second
  animateFlip(): void{
    const foreground_card = document.getElementById('foreground');
    if(foreground_card){
      foreground_card.setAttribute("style", "rotate: y -90deg;");

      this.slowForegroundB();
      this.slowBackgroundB();
    }


  }

  // progress bar updating after marking a card
  increaseProgress(): void {
    this.progress = this.progress + 10;
  }

  // back to dashboard
  redirectToDashboard(): void{
    this.router.navigateByUrl('/dashboard');
  }

  // when canceling redirecting to dashboard, restore the normal foreground view
  restoreSessionView(): void{
    this.toggleReminder();
    this.showForegroundB();
  }

  // when dropping the card on either side, increase the session progress,
  // hide the current view,
  // show a note based on correct / incorrect marking,
  // and call a method for further card information processing
  dropHandler(event: string): void {
    this.hideBackgroundB();
    this.increaseProgress();
    this.showBackgroundIcons = false;

    if(event == "yes"){
      this.toggleCorrectNote();
      this.trydrop('yes');
    } else if (event == "no"){
      this.toggleIncorrectNote();
      this.trydrop('no');
    }
  }


  // for processing of the cards on marking them as correct or incorrect
  trydrop(event: string): void {
    if(event == "yes"){
      // can be used
    } else if (event == "no"){
      // can be used
    }
  }

  // show the pretty drag zones, but hide the buttons as they jump around
  onDragStart(): void {
    this.showSides = true;
    this.showBackgroundIcons = false;
  }

  // hide the sides again and enable the buttons again
  onDragStop(): void {
    this.showSides = false;
    this.showBackgroundIcons = true;
  }

  // Animated hand icon which points to the UI elements you can interact with in foreground view
  ForegroundHand(): void{
    const FHand = document.getElementById('f_hand');
    if(FHand){
      if(this.curFHelperMessage == 0){

      // move to loudspeaker icon in lower left corner
      } else if(this.curFHelperMessage == 1){
        let height = 270;
        let rotate = -110;
        // adapt to different screen widths when moving the hand across the screen
        if(this.max_height_850.matches){
          height =  130;
        } else if (this.max_height_600.matches){
          height =  100;
        }
        let construct_string = "transform: translate(" + this.left_corner() +"%, " + height + "%) rotate(" + rotate + "deg);"
        FHand.setAttribute("style", construct_string);

        // move to progress bar in upper center
      } else if(this.curFHelperMessage == 2){
        let height = -360;
        if(this.max_height_850.matches){
          height = -280;
        } else if(this.max_height_600.matches){
          height = -200;
        }
        let construct_string = "transform: translate(0%, " + height + "%) rotate(0deg);"
        FHand.setAttribute("style", construct_string);

      // move to app icon in upper left corner
      } else if(this.curFHelperMessage == 3){
        let height = -370;

        if(this.max_height_850.matches){
          height = -280;
        } else if(this.max_height_600.matches){
          height = -200;
        }
        let construct_string = "transform: translate(" + (this.left_corner()-40) +"%, " + height + "%) rotate(-45deg);"
        FHand.setAttribute("style", construct_string);
      }
    }
  }


  // Animated hand icon which points to the UI elements you can interact with in background view
  BackgroundHand(): void{
    const BHand = document.getElementById('b_hand');
    if(BHand){
      // to sides
      if(this.curBHelperMessage == 0 || this.curBHelperMessage == 1){

        // left side
        if(this.curBHelperMessage == 0){
          let construct_string = "transform: translate(" + this.left_corner() +"%, 0%);"
        BHand.setAttribute("style", construct_string);
        // right side: just invert left styling
        } else if (this.curBHelperMessage == 1){
          let construct_string = "transform: translate(" + this.left_corner()*-1 +"%, 0%);"
          BHand.setAttribute("style", construct_string);
        }

      // lower left corner
      } else if(this.curBHelperMessage == 2){
        let height = 270;
        let rotate = -110;
        // adapt to different screen widths when moving the hand across the screen


        if(this.max_height_850.matches){
          height =  130;
        } else if (this.max_height_600.matches){
          height =  100;
        }
        let construct_string = "transform: translate(" + (this.left_corner()-10)  +"%, " + height + "%) rotate(" + rotate + "deg);"
        BHand.setAttribute("style", construct_string);
      }
    }
  }

  // Animated hand icon which points to the UI elements you can interact with in sentence view
  SentenceHand(): void{
    const SHand = document.getElementById('s_hand');
    if(SHand){
      if(this.curSHelperMessage == 0){
        let height = 270;
        // adapt to different screen widths when moving the hand across the screen
        if(this.max_height_850.matches){
          height =  130;
        } else if (this.max_height_600.matches){
          height =  100;
        }
        let construct_string = "transform: translate(" + (this.left_corner())  +"%, " + height + "%) rotate(-110deg);"
        SHand.setAttribute("style", construct_string);
      } else if(this.curSHelperMessage == 1){
        SHand.setAttribute("style", "display: none");
      }
    }
  }

// media queries for moving to bottom left corner
  left_corner():number{
    let width= -800;
    if (this.max_width_450.matches){
      width = -100;
    }else if(this.max_width_600.matches){
      width = -170;
    } else if(this.max_width_1000.matches){
      width = -250;
    } else if (this.max_width_1300.matches){
      width = -450;
    } else if (this.max_width_1500.matches){
      width = -500;
    } else if(this.max_width_1800.matches){
      width = -630;
    }
    return width;
  }

}


/************
// END of session.component.ts
//************/
