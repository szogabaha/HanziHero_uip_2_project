/**
 * File: character-animation.component.ts
 * This file contains the controller logic for the character drawing animation on the
 * login, register and forgot password screen.
 * Author: Gabor Szolnok
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-character-animation',
  templateUrl: './character-animation.component.html',
  styleUrls: ['./character-animation.component.css']
})
export class CharacterAnimationComponent implements OnInit, OnDestroy {
  // Dictionary containing the randomly generated width and height.
  //
  containerStyles: any;

  //The randomly selected image
  //
  selectedImage?: string;
  //Images to select from for decoration
  //
  images: string[] = [
    'assets/decoration/hanzi1.svg',
    'assets/decoration/hanzi2.jpg',
    'assets/decoration/hanzi3.png',
    'assets/decoration/hanzi4.png'
  ];

  //Subscription that we subscribe to and unsubscribe from for each period
  //
  private updateSubscription?: Subscription;
  //Bolean value to deecide if the next period displays the character or not.
  //
  isSwitched: boolean = false;

  //Starting the periodic update
  ngOnInit(): void {
    this.startPeriodicUpdates();
  }

  //Removing the subscription if we leave the component
  //
  ngOnDestroy(): void {
    this.stopPeriodicUpdates();
  }

  //create the subscription and subscribe to it
  //
  startPeriodicUpdates(): void {

    //1 period is 4 sec
    this.updateSubscription = interval(4000).subscribe(() => {
      const selector = Math.random()
      //Decide if we want to present the image or not
      if (selector < 0.7) {
        this.isSwitched = true;
        //Select a random image
        this.selectedImage = this.images[ Math.floor(selector * this.images.length)];
      } else {
        this.isSwitched = false;
        //If the image is not shown, add a small delay so that if there are more
        //of this component, they de-synchronize.
        setTimeout(() => {
        }, 150);
      }
      //Activate the random styling
      this.updateStyles();

    });
  }

  //Remove subscription
  //
  stopPeriodicUpdates(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  //Generate random x-y values and assign it to the container div.
  //
  updateStyles(): void {

    const containerWidth = Math.random() * 100 + 10 + '%';
    const containerHeight = Math.random() * 100 + 10 + '%';

    this.containerStyles = {
      width: containerWidth,
      height: containerHeight

    };
  }

}


/************
// END of character-animation.component.ts
//************/
