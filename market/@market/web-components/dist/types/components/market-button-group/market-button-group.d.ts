import type { PositioningStrategy } from '@popperjs/core';
/**
 * @slot - Intended to slot any number of `<market-button>` components here.
 * @slot overflow-buttons - Not intended for external consumers. Used by
 * `<market-button-group>` when programmatically arranging visible vs overflow
 * buttons based on available space.
 */
export declare class MarketButtonGroup {
    el: HTMLMarketButtonGroupElement;
    /**
     * A string specifying the alignment for the button group.
     * This will change button size and distribution across the group.
     */
    readonly alignment: 'left' | 'right' | 'split' | 'fill' | 'stack';
    /**
     * Configuration option for Popper.js (used to position `<market-popover>`).
     * Describes the positioning strategy to use. By default, it is absolute. If
     * your reference element is in a fixed container, use the fixed strategy.
     * https://popper.js.org/docs/v2/constructors//#strategy
     */
    readonly popoverStrategy: PositioningStrategy;
    /**
     * Sorted overflow and visible buttons
     */
    private _sortedButtonEls;
    /**
     * References to the button elements
     */
    private _buttonEls;
    /**
     * Used to set the index cutoff for overflowing buttons
     */
    private _buttonCutoffIndex;
    /**
     * Observers
     */
    private _observers;
    private getComputedWidth;
    /**
     * Find out where the cutoff will happen.
     * Main chunk of the overflow logic happens here
     */
    private findButtonCutoffIndex;
    /**
     * Sort buttons:
     * - split by `this._buttonCutoffIndex`
     * - visible buttons: remove attr `[slot="overflow-buttons"]`; remove `display: none;`
     * - overflow buttons: set attr `[slot="overflow-buttons"]`; add `display: none;`
     */
    private sortVisibleAndOverflowButtons;
    /**
     * Handle screen / component resize
     */
    private handleResize;
    private registerSlottedButtons;
    private throttledHandleResize;
    private observeContent;
    connectedCallback(): void;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    render(): any;
}
