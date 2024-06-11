import { Vec2 } from "cc";
import { LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";

export type EventType =
    "game.start" |

    "letters.changeSelected" | // LetterEntity[]
    "letters.upscale" | // LetterEntity[]
    "letters.downscale" | // LetterEntity[]
    "word.input" | // LetterEntity[]

    "words.ready" | // string[]

    "input.lock" |
    "input.unlock";

type Modify<T, R> = Omit<T, keyof R> & R;

export type EventEntity = {
    type: EventType;
    info?: any;
}

export type ChangeSelectedLettersEvent = Modify<EventEntity, { info: ChangeSelectedLettersEventInfo }>;

export type ChangeSelectedLettersEventInfo = {
    letters: LetterEntity[];
    pointer: Vec2;
}