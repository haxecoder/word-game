export type EventType =
    "game.start" |

    "letters.upscale" | // LetterEntity[]
    "letters.downscale" | // LetterEntity[]

    "words.ready" | // string[]

    "input.lock" |
    "input.unlock";

export type EventEntity = {
    type: EventType;
    info?: any;
}