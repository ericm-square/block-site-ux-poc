import type { Placement, PositioningStrategy } from '@popperjs/core';
import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot trigger - The text or icon used for the tooltip trigger. Interacting with the
 * slotted content will serve as the trigger that opens the popover. Defaults to
 * an ℹ️ icon.
 * @slot content - Content slotted here will appear in `market-popover`, which
 * becomes visible when the slotted trigger content is interacted with.
 * @part dropdown - the market-dropdown element.
 * @part trigger - the trigger element.
 * @part popover - the popover element.
 */
export declare class MarketTooltip {
    el: HTMLMarketTooltipElement;
    /**
     * Defines what types of interaction the tooltip should have
     * (see `market-dropdown` docs for more granular explanation)
     */
    readonly interaction: 'click' | 'hover' | 'persistent' | 'none';
    /**
     * Functionally and visually disables the tooltip trigger.
     */
    readonly disabled: boolean;
    /**
     * Configuration option for Popper.js (used to position the tooltip overlay).
     * Describes the preferred placement of the popper.
     * https://popper.js.org/docs/v2/constructors//#placement
     */
    readonly popoverPlacement: Placement;
    /**
     * Configuration option for Popper.js (used to position `<market-popover>`).
     * Describes the positioning strategy to use. By default, it is absolute. If
     * your reference element is in a fixed container, use the fixed strategy.
     * https://popper.js.org/docs/v2/constructors//#strategy
     */
    readonly popoverStrategy: PositioningStrategy;
    /**
     * Configuration option for Popper.js (used to position `<market-popover>`).
     * Displaces the popover along the reference element.
     * https://popper.js.org/docs/v2/modifiers/offset/#skidding-1
     */
    readonly popoverSkidding: number;
    /**
     * Configuration option for Popper.js (used to position `<market-popover>`).
     * Displaces the popper away from, or toward, the reference element in the
     * direction of its placement.
     * https://popper.js.org/docs/v2/modifiers/offset/#distance-1
     */
    readonly popoverDistance: number;
    /**
     * Whether or not the tooltip is open. Setting it to true means it will be open
     * by default
     */
    expanded: boolean;
    /**
     * Fired whenever the tooltip is opened.
     */
    marketTooltipOpened: EventEmitter;
    /**
     * Fired whenever the tooltip is closed.
     */
    marketTooltipClosed: EventEmitter;
    dropdownOpenedEventHandler(e: CustomEvent<void>): void;
    dropdownClosedEventHandler(e: CustomEvent<void>): void;
    innerDropdown: HTMLMarketDropdownElement;
    /**
     * Opens the tooltip
     */
    openTooltip(): Promise<void>;
    /**
     * Closes the tooltip
     */
    closeTooltip(): Promise<void>;
    styleLinks(): void;
    componentWillRender(): void;
    render(): any;
}
