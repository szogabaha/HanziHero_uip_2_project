export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  studyLanguage: Language;
  sessionLength: number;
  reminder: boolean;
}

export enum Language {
  Chinese = "chinese",
  Japanese = "japanese",
  Korean = "korean",
}
