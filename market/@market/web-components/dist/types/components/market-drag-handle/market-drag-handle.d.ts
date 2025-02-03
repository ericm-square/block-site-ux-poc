import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketDragCoords, TMouseOrTouchEvent } from '../../utils/gesture/types';
export declare class MarketDragHandle {
    /**
     * Fired whenever a drag is started.
     */
    marketDragHandleDragStart: EventEmitter<TMarketDragCoords>;
    /**
     * Fired whenever a drag is moved.
     */
    marketDragHandleDragMove: EventEmitter<TMarketDragCoords>;
    /**
     * Fired whenever a drag is ended.
     */
    marketDragHandleDragEnd: EventEmitter<TMarketDragCoords>;
    boundOnDragMove: any;
    boundOnDragEnd: any;
    onDragStart(e: TMouseOrTouchEvent): void;
    onDragMove(e: TMouseOrTouchEvent): void;
    onDragEnd(e: TMouseOrTouchEvent): void;
    render(): any;
}
