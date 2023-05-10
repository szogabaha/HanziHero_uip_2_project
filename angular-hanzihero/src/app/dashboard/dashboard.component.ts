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
  selectedCard?: Card;
  showCards?: Boolean = false;
  showDeckEditor?: Boolean = false;
  showCardEditor?: Boolean = false;

  ngOnInit(): void{
    this.getDecks();
  }

  onSelectDeck(deck: Deck): void {
    this.selectedDeck = deck;
    this.showCards = false;
  }

  onSelectCard(card: Card): void {
    this.selectedCard = card;
  }



  onShowCards(deck: Deck): void {
    this.getMatchingCards(deck);
    this.showCards = !this.showCards;
  }

  toggleDeckEditor(): void {
    this.showDeckEditor = !this.showDeckEditor;
  }

  hideDeckEditor(): void{
    this.showDeckEditor = false;
  }

  toggleCardEditor(): void {
    this.showCardEditor = !this.showCardEditor;
  }

  hideCardEditor(): void{
    this.showCardEditor = false;
  }



  getDecks(): void {
    this.decks = this.modelService.getDecks();
  }

  getMatchingCards(deck: Deck): void {
    this.cards = this.modelService.getCardsFromDeck(deck);
  }
}
