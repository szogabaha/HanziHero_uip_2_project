import {Deck, Card, LearningStatus} from './content';
import {User, Language} from './user';

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

