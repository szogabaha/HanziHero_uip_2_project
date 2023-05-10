import { Component } from '@angular/core';
import { ModelServiceService } from '../model-service.service';
import {Deck, Card} from '../model/content'
import { DECKS, CARDS, USERS } from '../model/mock_database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  decks: Deck[] = [];
  cards: Card[] = [];

  constructor(private modelService: ModelServiceService){

  }

  selectedDeck?: Deck;
  showCards?: Boolean = false;

  onSelect(deck: Deck): void {
    this.selectedDeck = deck;
  }

  onShowCards(): void {
    this.showCards = !this.showCards;
  }

  ngOnInit(): void{
    this.getDecks();
  }

  getDecks(): void {
    this.decks = this.modelService.getDecks();
  }
}
