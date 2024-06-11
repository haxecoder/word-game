export type EventType =
    "game.start" |

    "input.lock" |
    "input.unlock";

export type EventEntity = {
    type: EventType;
    info?: any;
}