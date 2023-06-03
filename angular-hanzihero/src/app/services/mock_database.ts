/**
 * File: mock_database.ts
 * This file contains the mocked database structule as well as the example records
 *
 * Author: Gabor Szolnok
 */
import {Deck, Card, LearningStatus} from '../model/content';
import {User, Language} from '../model/user';




export class MockDataBase {

  //These are the sessionStorage keys used throughout the other services
  static readonly USERS_STORAGE_KEY = 'users';
  static readonly CURRENT_USER_STORAGE_KEY = 'currentUser';
  static readonly DECKS_STORAGE_KEY = 'decks';
  static readonly CARDS_STORAGE_KEY = 'cards';

  //Create items in the sessionStorage
  //
  constructor() {
    if (!sessionStorage.getItem(MockDataBase.USERS_STORAGE_KEY)) {
      sessionStorage.setItem(MockDataBase.USERS_STORAGE_KEY, JSON.stringify(USERS));
    }
    if (!sessionStorage.getItem(MockDataBase.DECKS_STORAGE_KEY)) {
      sessionStorage.setItem(MockDataBase.DECKS_STORAGE_KEY, JSON.stringify(DECKS));
    }
    if (!sessionStorage.getItem(MockDataBase.CARDS_STORAGE_KEY)) {
      sessionStorage.setItem(MockDataBase.CARDS_STORAGE_KEY, JSON.stringify(CARDS));
    }
  }

}


//Only static example data from here
export const USERS: User[] = [
    {
        id: 1,
        userName: "Han",
        email: "han@email.test",
        password: "securepassword",
        studyLanguage: Language.Chinese,
        sessionLength: 20,
        reminder: true,
    },

    {
        id: 2,
        userName: "Carl",
        email: "carl@email.test",
        password: "cats",
        studyLanguage: Language.Korean,
        sessionLength: 15,
        reminder: true,
    },

]

export const DECKS: Deck[] = [
    {
        deckId: 1,
        deckName: "Animals",
        deckDescription: "Some common animals",
        color: "#FFFFFF",
        user: USERS[1],
        language: Language.Chinese,
        createdAt: new Date(),
        lastRevised: new Date(),
    },

    {
        deckId: 2,
        deckName: "Kitchen",
        deckDescription: "Some common kitchen items",
        color: "#FFFFFF",
        user: USERS[0],
        language: Language.Chinese,
        createdAt: new Date(),
        lastRevised: new Date(),
    }
]

export const CARDS: Card[] = [
    {
        cardId: 1,
        deckOrigin: DECKS[0],
        status: LearningStatus.Unknown,
        meaning: "Panda",
        characters: "熊猫",
        pronunciation: "xióngmāo",
        sourceSentence: "There's a Panda sitting in that tree over there.",
        targetSentence: "Nàlĭ yŏu yī zhī xióngmāo zuò zài nàbiān de shù shàng.",
    },

    {
        cardId: 2,
        deckOrigin: DECKS[0],
        status: LearningStatus.Revise,
        meaning: "Horse",
        characters: "马",
        pronunciation: "mă",
        sourceSentence: "He's able to ride a horse.",
        targetSentence: "Tā hùi qí mă.",
    },

    {
        cardId: 3,
        deckOrigin: DECKS[1],
        status: LearningStatus.Learnt,
        meaning: "Fork",
        characters: "叉子",
        pronunciation: "chāzi",
        sourceSentence: "People here use spoons and forks.",
        targetSentence: "Zhèlĭ de rén yòng sháozi hé chāzi.",
    },

]


/************
// END of mock_database.ts
//************/
