import { Language, User } from "./user";
import {formatDate } from '@angular/common';

export interface Deck {
    deckId: number;
    deckName: string;
    deckDescription: string;
    color: string; 
    user: User;
    language: Language;
    createdAt: Date;
    lastRevised: Date;
    

}

export interface Card {
    cardId: number;
    deckOrigin: Deck;
    status: LearningStatus;
    meaning: string;
    characters: string; 
    pronunciation: string;
    sourceSentence: string;
    targetSentence: string;
}

export enum LearningStatus {
    Learnt,
    Revise,
    Unknown,
}