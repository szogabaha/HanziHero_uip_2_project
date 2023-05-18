import { Component, ViewChildren, Input } from '@angular/core';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Deck, Card, LearningStatus} from '../model/content'
import {User} from '../model/user';



@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})

export class SessionComponent {
  showReminder?: Boolean = false;
  showForeground?: Boolean = true;
  showBackground?: Boolean = false;
  showBackgroundIcons?: Boolean = true;
  showSentence?: Boolean = false;
  showSides?: Boolean = false;

  showIncorrectNote?: Boolean = false;
  showCorrectNote?: Boolean = false;

  showForegroundHelper?: Boolean = false;
  showBackgroundHelper?: Boolean = false;
  showSentenceHelper?: Boolean = false;
  progress: number = 0;

  yes?: any;
  no?: any;


  currentCard?: Card[];
  correctItems: Card[] = [];
  incorrectItems: Card[] = [];


  curFHelperMessage: number = 0;
  curBHelperMessage: number = 0;
  curSHelperMessage: number = 0;

  foregroundHelperMessages: any[] = [
    "Click on the loudspeaker to hear the pronunciation.",
    "Your session progress is shown in the header.",
    "To cancel your session, click on Han."
  ]


  backgroundHelperMessages: any[] = [
    "Drag the card to the left if you want to mark it as incorrect.",
    "Drag the card to the right if you want to mark it as correct.",
    "Click on the sentence icon in the bottom left corner to show example sentences."
  ]

  sentenceHelperMessages: any[] = [
    "Click on the return button in the bottom left corner to get back to the hanzi.",
    "When displaying the card's hanzi, you can mark it as correct or incorrect."

  ]

  f_message_max_length = Object.keys(this.foregroundHelperMessages).length;
  b_message_max_length = Object.keys(this.backgroundHelperMessages).length;
  s_message_max_length = Object.keys(this.sentenceHelperMessages).length;
  
  constructor(private router: Router){}

  ngOnInit(): void{
  }

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
    if(this.curFHelperMessage == this.f_message_max_length){
      this.toggleForegroundHelper();
      this.FHelpReset();
      
    } else{
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

  increaseProgress(): void {
    this.progress = this.progress + 10;
  }

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

}
