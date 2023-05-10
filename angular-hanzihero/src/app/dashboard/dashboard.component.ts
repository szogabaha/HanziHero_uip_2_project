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
  showEditor?: Boolean = false;
  showStaticDeckView?: Boolean = false;

  ngOnInit(): void{
    this.getDecks();
  }

  onSelect(deck: Deck): void {
    this.selectedDeck = deck;
    this.showCards = false;
  }

  onShowCards(deck: Deck): void {
    this.getMatchingCards(deck);
    this.showCards = !this.showCards;
  }

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
  }

  hideEditor(): void{
    this.showEditor = false;
  }



  getDecks(): void {
    this.decks = this.modelService.getDecks();
  }

  getMatchingCards(deck: Deck): void {
    this.cards = this.modelService.getCardsFromDeck(deck);
  }
}
