import { Injectable } from '@angular/core';
import {Deck, Card} from './model/content';
import { User } from './model/user';
import { DECKS, CARDS, USERS } from './model/mock_database';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor() { }

  getDecks(): Deck[]{
    return DECKS;
  }

  getAllCards(): Card[]{
    return CARDS;
  }

  getCardsFromDeck(deck: Deck): Card[]{
    return CARDS;
  }

  getUsers(): User[]{
    return USERS;
  }
}
