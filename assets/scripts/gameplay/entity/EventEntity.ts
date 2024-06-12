import { Vec2 } from "cc";
import { LetterEntity, WordPlaceEntity } from "db://assets/scripts/gameplay/entity/Entity";

export type EventType =
    "game.start" |
    "game.ready" |

    "letters.changeSelected" | // ChangeSelectedLettersEvent
    "letters.upscale" | // LetterEntity[]
    "letters.downscale" | // LetterEntity[]
    "word.input" | // LetterEntity[]
    "word.accept" | // WordAcceptEvent
    "word.repeat" | // WordPlaceEntity

    "words.ready" | // string[]

    "letter.preview.add" | // AnimatePreviewLettersEvent
    "letter.preview.remove" | // AnimatePreviewLettersEvent

    "input.lock" |
    "input.unlock";

type Modify<T, R> = Omit<T, keyof R> & R;

export type EventEntity = {
    type: EventType;
    info?: any;
}

export type ChangeSelectedLettersEvent = Modify<EventEntity, { info: ChangeSelectedLettersEventInfo }>;
export type AnimatePreviewLettersEvent = Modify<EventEntity, { info: AnimatePreviewLettersEventInfo }>;
export type WordAcceptEvent = Modify<EventEntity, { info: WordAcceptEventInfo }>

export type WordAcceptEventInfo = {
    previewLetters: LetterEntity[];
    wordPlace: WordPlaceEntity;
}

export type ChangeSelectedLettersEventInfo = {
    letters: LetterEntity[];
    pointer: Vec2;
}

export type AnimatePreviewLettersEventInfo = {
    letter: LetterEntity;
    index: number;
}