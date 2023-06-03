/**
 * File: user.ts
 * The model of the user handling related classes
 * These are the interfaces of the "User" and "Language"
 *
 * Author: Gabor Szolnok
 */
export interface User {
  id: number; //Unique
  userName: string;
  email: string;
  password: string;
  studyLanguage: Language;
  sessionLength: number; //How many cards does a session consist of
  reminder: boolean; //How frequently do we want to get a reminder
}

export enum Language {
  Chinese = "chinese",
  Japanese = "japanese",
  Korean = "korean",
}


/************
// END of user.ts
//************/
