import { Injectable } from '@angular/core';
import {Deck, Card} from '../model/content';
import { User } from '../model/user';
import { DECKS, CARDS, USERS } from './mock_database';
import { MockDataBase } from './mock_database';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor() { }

  getDecks(): Observable<Deck[]>{
    const decks = sessionStorage.getItem(MockDataBase.DECKS_STORAGE_KEY)
    const parsedDecks = decks ? of(JSON.parse(decks)) : of({} as Deck[])
    return parsedDecks
  }

  getAllCards(): Observable<Card[]>{
    const cards = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const parsedCards = cards ? of(JSON.parse(cards)) : of([] as Card[])
    return parsedCards
  }


  // filters out cards not from the deck
  getCardsFromDeck(deck: Deck): Observable<Card[]>{
    const cards = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const parsedCards: Observable<Card[]> = cards ? of(JSON.parse(cards)) : of([] as Card[])
    return parsedCards.pipe(map(cards => cards.filter(card => card.deckOrigin === deck)));
  }

  putCard(card: Card): void {
    const cardsString = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const cards = cardsString ? JSON.parse(cardsString) : []
    cards.push(card)
    sessionStorage.setItem(MockDataBase.CARDS_STORAGE_KEY, cards)
  }

  putDeck(deck: Deck): void {
    const deckString = sessionStorage.getItem(MockDataBase.DECKS_STORAGE_KEY)
    const decks = deckString ? JSON.parse(deckString) : []
    decks.push(deck)
    sessionStorage.setItem(MockDataBase.DECKS_STORAGE_KEY, decks)
  }

  genCardId(card: Card[]): number {
    const cardsString = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const cards: Card[] = cardsString ? JSON.parse(cardsString) : []
    return cards.length > 0 ? Math.max(...cards.map(card => card.cardId)) + 1 : 1;
  }

  genDeckId(deck: Deck[]): number {
    const deckString = sessionStorage.getItem(MockDataBase.DECKS_STORAGE_KEY)
    const decks: Deck[] = deckString ? JSON.parse(deckString) : []
    return decks.length > 0 ? Math.max(...decks.map(deck => deck.deckId)) + 1 : 1;
  }
}
