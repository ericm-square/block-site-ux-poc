import { EventEmitter } from '../stencil-public-runtime';
import { TMarketDragEventDetail, MarketDraggableElement } from './draggable';
export type TMarketReorderableOptions = 'off' | 'internal' | 'external';
export interface MarketReorderableElement extends HTMLElement {
    reorderable: TMarketReorderableOptions;
}
export declare function isReorderable(value: unknown): value is MarketReorderableElement;
export type TMarketReorderEventDetail = {
    item: MarketDraggableElement;
    oldIndex: number;
    newIndex: number;
};
export declare const TABLE_GROUP_EXPAND_TIMEOUT_DURATION = 300;
export declare class Reorderable {
    el: MarketReorderableElement;
    accepts: Array<string>;
    event: EventEmitter<TMarketReorderEventDetail>;
    mode: 'default' | 'framework';
    tableGroupExpandTimeout: ReturnType<typeof setTimeout>;
    static cursor: HTMLDivElement;
    static createCursor(): HTMLDivElement;
    constructor({ el, accepts, event, mode, }: {
        el: MarketReorderableElement;
        accepts: Array<string>;
        event: EventEmitter;
        mode: 'default' | 'framework';
    });
    private isValidDrag;
    /**
     * Fired on a target element when an item is dragged over the target.
     */
    dragMove(e: CustomEvent<TMarketDragEventDetail>): void;
    /**
     * Fired on a target element when a dragged item leaves the target
     */
    dragLeave(): void;
    /**
     * Fired on a dragged item when it is released.
     * Useful to determine if an item was dropped externally.
     */
    dragEnd(e: CustomEvent<TMarketDragEventDetail>): void;
    /**
     * Fired on a target element when a dragged item is released over the target.
     */
    dragDrop(e: CustomEvent<TMarketDragEventDetail>): Promise<void>;
    destroy(): void;
}
