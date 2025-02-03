import { TMarketDragCoords } from './gesture/types';
export interface MarketDraggableElement extends HTMLElement {
    dragEnabled: boolean;
}
export declare function isDraggable(value: unknown): value is MarketDraggableElement;
export type TMarketDragEventDetail = {
    x: number;
    y: number;
    el: MarketDraggableElement;
    clone: MarketDraggableElement;
    source: HTMLElement;
    target: HTMLElement;
};
export type TMarketDragAnchor = 'none' | 'left' | 'right';
export declare const SCROLL_DELAY: number;
export declare const SCROLL_STEP_MAX = 24;
export declare class Draggable {
    el: MarketDraggableElement;
    clone: MarketDraggableElement;
    source: HTMLElement;
    target: HTMLElement;
    startCoords: TMarketDragCoords;
    previousCoords: TMarketDragCoords;
    canceled: boolean;
    scrollParent: HTMLElement;
    scrollInterval: ReturnType<typeof setInterval>;
    anchor: TMarketDragAnchor;
    constructor(el: MarketDraggableElement, opts?: {
        anchor?: TMarketDragAnchor;
    });
    start(coords: TMarketDragCoords): Promise<void>;
    move(coords: TMarketDragCoords): void;
    end(coords: TMarketDragCoords): Promise<void>;
    private scroll;
    destroy(): void;
}
