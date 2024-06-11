export type EventType =
    "game.start" |

    "letters.upscale" |
    "letters.downscale" |

    "input.lock" |
    "input.unlock";

export type EventEntity = {
    type: EventType;
    info?: any;
}