import { Component } from '@angular/core';
import {Deck, Card} from '../model/content'
import { DECKS, CARDS, USERS } from '../model/mock_database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  decks = DECKS;
  cards = CARDS;
  selectedDeck?: Deck;
  showCards?: Boolean;

  onSelect(deck: Deck): void {
    this.selectedDeck = deck;
  }

  onShowCards(): void {
    this.showCards = true;
  }
}
