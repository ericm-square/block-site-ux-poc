import { TMarketDragCoords, TMouseOrTouchEvent } from './types';
/**
 * Check if the event is a TouchEvent
 * @param {TMouseOrTouchEvent} event
 */
export declare function isTouchEvent(event: TMouseOrTouchEvent): event is TouchEvent;
export declare function getCoordsFromEvent(e: TMouseOrTouchEvent): TMarketDragCoords;
