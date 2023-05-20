import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-character-animation',
  templateUrl: './character-animation.component.html',
  styleUrls: ['./character-animation.component.css']
})
export class CharacterAnimationComponent implements OnInit, OnDestroy {
  containerStyles: any;
  animationStyles: any;
  selectedImage?: string;
  images: string[] = [
    'assets/decoration/hanzi1.svg',
    'assets/decoration/hanzi2.jpg',
    'assets/decoration/hanzi3.png',
    'assets/decoration/hanzi4.png'
  ];

  private updateSubscription?: Subscription;
  isSwitched: boolean = false;
  ngOnInit(): void {
    this.startPeriodicUpdates();
  }

  ngOnDestroy(): void {
    this.stopPeriodicUpdates();
  }

  startPeriodicUpdates(): void {


    this.updateSubscription = interval(4000).subscribe(() => {
      const selector = Math.random()
      if (selector < 0.7) {
        this.isSwitched = true;
        this.selectedImage = this.images[ Math.floor(selector * this.images.length)];
      } else {
        this.isSwitched = false;
        setTimeout(() => {
        }, 150);
      }
      this.updateStyles();

    });
  }

  stopPeriodicUpdates(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  updateStyles(): void {

    const containerWidth = Math.random() * 100 + 10 + '%';
    const containerHeight = Math.random() * 100 + 10 + '%';

    this.containerStyles = {
      width: containerWidth,
      height: containerHeight

    };
  }

}
