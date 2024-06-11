import { Node } from "cc";

type Modify<T, R> = Omit<T, keyof R> & R;

export type EntityType = "";

export type EntityView = {
    node: Node;
};

export type Entity = {
    type: EntityType;
    view?: EntityView;
    info?: any;
}