import { Node } from "cc";

type Modify<T, R> = Omit<T, keyof R> & R;

export type EntityType =
    "game.ui" |
    "button.swap" |
    "word.place" |
    "letter.preview" |
    "letter.word" |
    "letter.circle";

export type EntityView = {
    node: Node;
};

export type Entity = {
    type: EntityType;
    view?: EntityView;
    info?: any;
}

export type LetterEntity = Modify<Entity, { info: LetterEntityInfo }>;
export type WordPlaceEntity = Modify<Entity, { info: WordPlaceEntityInfo }>;

type WordPlaceEntityInfo = {
    letters: LetterEntity[],
    word: string
}

type LetterEntityInfo = {
    letter: string;
}

