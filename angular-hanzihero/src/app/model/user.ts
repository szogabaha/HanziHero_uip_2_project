export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  studyLanguage: Language;
  sessionLength: number;

}

export enum Language {
  Chinese,
  Japanese,
  Korean,
}
