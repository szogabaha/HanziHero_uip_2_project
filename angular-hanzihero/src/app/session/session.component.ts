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
  progress: number = 0;

  yes?: any;
  no?: any;


  currentCard?: Card[];
  correctItems: Card[] = [];
  incorrectItems: Card[] = [];


  constructor(private router: Router){}

  ngOnInit(): void{

  }

  toggleForegroundB(): void {
    this.showForeground = !this.showForeground;
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

  increaseProgress(): void {
    this.progress = this.progress + 10;
  }

  redirectToDashboard(): void{
    this.router.navigateByUrl('/dashboard');
  }

  restoreSessionView(): void{
    this.toggleReminder();
    this.showForegroundB();
  }

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


  trydrop(event: string): void {
    if(event == "yes"){
      // can be used
    } else if (event == "no"){
      // can be used
    }
  }

  onDragStart(): void {
    this.showSides = true;
    this.showBackgroundIcons = false;
  }

  onDragStop(): void {
    this.showSides = false;
    this.showBackgroundIcons = true;
  }

}
