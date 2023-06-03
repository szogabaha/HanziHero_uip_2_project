/**
 * File: model-service.service.ts
 * The model logic for Deck and card related functionalities
 *
 * Author: Gabor Szolnok
 */
import { Injectable } from '@angular/core';
import {Deck, Card} from '../model/content';
import { MockDataBase } from './mock_database';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor() { }

  //Get decks from db
  //
  getDecks(): Observable<Deck[]>{
    const decks = sessionStorage.getItem(MockDataBase.DECKS_STORAGE_KEY)
    const parsedDecks = decks ? of(JSON.parse(decks)) : of({} as Deck[])
    return parsedDecks
  }

  //Get all the cards from the db
  //
  getAllCards(): Observable<Card[]>{
    const cards = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const parsedCards = cards ? of(JSON.parse(cards)) : of([] as Card[])
    return parsedCards
  }


  // Get cards of a specific deck
  //
  getCardsFromDeck(deck: Deck): Observable<Card[]>{
    const cards = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const parsedCards: Observable<Card[]> = cards ? of(JSON.parse(cards)) : of([] as Card[])
    return parsedCards.pipe(map(cards => cards.filter(card => card.deckOrigin.deckId === deck.deckId)));
  }

  //Create new card
  //
  putCard(card: Card): void {
    const cardsString = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const cards = cardsString ? JSON.parse(cardsString) : []
    cards.push(card)
    sessionStorage.setItem(MockDataBase.CARDS_STORAGE_KEY, cards)
  }

  //Create new deck
  //
  putDeck(deck: Deck): void {
    const deckString = sessionStorage.getItem(MockDataBase.DECKS_STORAGE_KEY)
    const decks = deckString ? JSON.parse(deckString) : []
    decks.push(deck)
    sessionStorage.setItem(MockDataBase.DECKS_STORAGE_KEY, decks)
  }

  //Generate the next unique card id.
  genCardId(card: Card[]): number {
    const cardsString = sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)
    const cards: Card[] = cardsString ? JSON.parse(cardsString) : []
    return cards.length > 0 ? Math.max(...cards.map(card => card.cardId)) + 1 : 1;
  }

  //Generate the next unique Deck id
  genDeckId(deck: Deck[]): number {
    const deckString = sessionStorage.getItem(MockDataBase.DECKS_STORAGE_KEY)
    const decks: Deck[] = deckString ? JSON.parse(deckString) : []
    return decks.length > 0 ? Math.max(...decks.map(deck => deck.deckId)) + 1 : 1;
  }
}


/************
// END of mock-service.service.ts
//************/
