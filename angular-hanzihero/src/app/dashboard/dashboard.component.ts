import { Component } from '@angular/core';
import { ModelServiceService } from '../model-service.service';
import {Deck, Card, LearningStatus} from '../model/content'
import {User} from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  decks: Deck[] = [];
  cards: Card[] = [];
  users: User[] = [];

  constructor(private modelService: ModelServiceService){

  }

  selectedDeck?: Deck;
  selectedCard?: Card;
  showCards?: Boolean = false;
  showDeckEditor?: Boolean = false;
  showCardEditor?: Boolean = false;
  showNewDeckCreator?: Boolean = false;
  showNewCardCreator?: Boolean = false;

  ngOnInit(): void{
    this.getDecks();
    this.getUsers();
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

  hideDecks(): void {
    this.selectedDeck = undefined;
  }

  hideCards(): void {
    this.showCards = false;
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

  toggleNewDeckCreator(): void {
    this.showNewDeckCreator = !this.showNewDeckCreator;
  }

  hideNewDeckCreator(): void {
    this.showNewDeckCreator = false;
  }

  toggleNewCardCreator(): void {
    this.showNewCardCreator = !this.showNewCardCreator;
  }

  hideNewCardCreator(): void {
    this.showNewCardCreator = false;
  }

  getDecks(): void{
    this.modelService.getDecks()
      .subscribe(decks => this.decks = decks);
  }

  getUsers(): void{
    this.modelService.getUsers()
      .subscribe(users => this.users = users);
  }

  getAllCards(): void{
    this.modelService.getAllCards()
      .subscribe(cards => this.cards = cards);
  }


  getMatchingCards(deck: Deck): void {
    this.modelService.getCardsFromDeck(deck)
      .subscribe(cards => this.cards = cards);
  }

  addDeck(deckName: string, deckDescription: string): void{

    deckName = deckName.trim();
    deckDescription = deckDescription.trim();

    if (!deckName || !deckDescription) { 
      return; 
    }

    let deckId = this.modelService.genDeckId(this.decks);
    let color =  "#FFFFFF"; 
    let user = this.users[0];
    let language = this.users[0].studyLanguage;
    let createdAt= new Date();
    let lastRevised= new Date();
    this.modelService.putDeck(
      {deckId,
       deckName,
       deckDescription,
       color,
       user,
       language,
       createdAt,
       lastRevised
      } as Deck);
  }

  addCard(deckOrigin: Deck, meaning: string, characters: string, 
    pronunciation: string, sourceSentence: string, targetSentence: string): void{

    meaning = meaning.trim();
    characters = characters.trim();
    pronunciation = pronunciation.trim();
    sourceSentence = sourceSentence.trim();
    targetSentence = targetSentence.trim();

    if(!meaning || !characters || !pronunciation){
      return; 
    }

    
    let cardId = this.modelService.genCardId(this.cards);
    let status = LearningStatus.Unknown;

    this.modelService.putCard(
      {cardId,
       deckOrigin,
       status,
       meaning,
       characters,
       pronunciation,
       sourceSentence,
       targetSentence
      } as Card);
  }
}
