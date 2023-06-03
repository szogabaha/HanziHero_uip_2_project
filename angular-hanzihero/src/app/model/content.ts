/**
 * File: content.ts
 * The model of the application related classes
 * These are the interfaces of the "Deck and "Card"
 *
 * Author: Gabor Szolnok
 * 
 */
import { Language, User } from "./user";

export interface Deck {
    deckId: number; //unique
    deckName: string;
    deckDescription: string;
    color: string; //TODO unused in the end
    user: User;
    language: Language;
    createdAt: Date;
    lastRevised: Date;


}

export interface Card {
    cardId: number; //Unique
    deckOrigin: Deck; //One to many conection to deck
    status: LearningStatus; //Todo unused
    meaning: string;
    characters: string;
    pronunciation: string;
    sourceSentence: string;
    targetSentence: string;
}

//We had the idea that a card can have three states
//And that these states are updated according to how well
//The user knows the cards. Not implemented due to lack of time
//
export enum LearningStatus {
    Learnt,
    Revise,
    Unknown,
}


/************
// END of contents.ts
//************/
