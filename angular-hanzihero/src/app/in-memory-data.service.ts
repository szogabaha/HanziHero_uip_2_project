import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Deck, Card, LearningStatus} from './model/content';
import {User, Language} from './model/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      {
        id: 1,
        userName: "Han",
        email: "han@email.test",
        password: "securepassword",
        studyLanguage: Language.Chinese,
        sessionLength: 20,
      },

      {
        id: 2,
        userName: "Carl",
        email: "carl@email.test",
        password: "cats",
        studyLanguage: Language.Korean,
        sessionLength: 15,
      },
    ]

    const decks: Deck[] = [
      {
        deckId: 1,
        deckName: "Animals",
        deckDescription: "Some common animals",
        color: "#FFFFFF", 
        user: users[1],
        language: Language.Chinese,
        createdAt: new Date(),
        lastRevised: new Date(),
      },

      {
        deckId: 2,
        deckName: "Kitchen",
        deckDescription: "Some common kitchen items",
        color: "#FFFFFF", 
        user: users[0],
        language: Language.Chinese,
        createdAt: new Date(),
        lastRevised: new Date(),
      },
    ]

    const cards: Card[] = [
      {
        cardId: 1,
        deckOrigin: decks[0],
        status: LearningStatus.Unknown,
        meaning: "Panda",
        characters: "熊猫",
        pronunciation: "xióngmāo",
        sourceSentence: "There's a Panda sitting in that tree over there.",
        targetSentence: "Nàlĭ yŏu yī zhī xióngmāo zuò zài nàbiān de shù shàng.",
      },
  
      {
        cardId: 2,
        deckOrigin: decks[0],
        status: LearningStatus.Revise,
        meaning: "Horse",
        characters: "马",
        pronunciation: "mă",
        sourceSentence: "He's able to ride a horse.",
        targetSentence: "Tā hùi qí mă.",
      },
  
      {
        cardId: 3,
        deckOrigin: decks[1],
        status: LearningStatus.Learnt,
        meaning: "Fork",
        characters: "叉子",
        pronunciation: "chāzi",
        sourceSentence: "People here use spoons and forks.",
        targetSentence: "Zhèlĭ de rén yòng sháozi hé chāzi.",
      },
    ]


    return {users, decks, cards}
  }
  constructor() { }


  genUserID(users: User[]): number {
    return users.length > 0? Math.max(...users.map(user => user.id)) + 1 : 1;
  }

  genDeckID(decks: Deck[]): number {
    return decks.length > 0? Math.max(...decks.map(deck => deck.deckId)) + 1 : 1;
  }

  genCardID(cards: Card[]): number {
    return cards.length > 0? Math.max(...cards.map(card => card.cardId)) + 1 : 1;
  }
}
