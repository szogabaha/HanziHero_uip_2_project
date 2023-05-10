import { Component } from '@angular/core';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})

export class SessionComponent {
  showForeground?: Boolean = true;
  showBackground?: Boolean = false;
  showSentence?: Boolean = false;
  progress: number = 0;

  constructor(){}

  ngOnInit(): void{

  }

  toggleForegroundB(): void {
    this.showForeground = !this.showForeground;
  }

  toggleBackgroundB(): void {
    this.showBackground = !this.showBackground;
  }

  toggleSentenceB(): void {
    this.showSentence = !this.showSentence;
  }

  increaseProgress(): void {
    this.progress = this.progress + 10;
  }

}
