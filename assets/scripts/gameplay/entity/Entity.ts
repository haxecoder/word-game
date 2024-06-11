import { Node } from "cc";

type Modify<T, R> = Omit<T, keyof R> & R;

export type EntityType =
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

type LetterEntityInfo = {
    letter: string;
}

