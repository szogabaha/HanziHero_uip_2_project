import { Injectable } from '@angular/core';
import {Deck, Card} from './model/content';
import { User } from './model/user';
import { DECKS, CARDS, USERS } from './model/mock_database';

import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor() { }

  getDecks(): Observable<Deck[]>{
    const decks = of(DECKS);
    return decks;
  }

  getAllCards(): Observable<Card[]>{
    const cards = of(CARDS);
    return cards;
  }


  // filters out cards not from the deck
  getCardsFromDeck(deck: Deck): Observable<Card[]>{
    const cards = of(CARDS);
    return cards.pipe(map(cards => cards.filter(card => card.deckOrigin === deck)));
  }


  getUsers(): Observable<User[]>{
    const users = of(USERS);
    return users;
  }

  putUser(user: User): void {
    USERS.push(user);
  }

  putCard(card: Card): void {
    CARDS.push(card);
  }

  putDeck(deck: Deck): void {
    DECKS.push(deck);
  }

  genCardId(card: Card[]): number {
    return CARDS.length > 0 ? Math.max(...CARDS.map(card => card.cardId)) + 1 : 1;
  }

  genDeckId(deck: Deck[]): number {
    return DECKS.length > 0 ? Math.max(...DECKS.map(deck => deck.deckId)) + 1 : 1;
  }
}
