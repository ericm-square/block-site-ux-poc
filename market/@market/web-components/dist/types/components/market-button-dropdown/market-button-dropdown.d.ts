import type { Placement, PositioningStrategy } from '@popperjs/core';
import { EventEmitter } from '../../stencil-public-runtime';
import { AriaAttributes } from '../../utils/aria';
import type { TDropdownTriggerElement } from '../../utils/dropdown';
/**
 * @slot trigger - Expects a slotted `market-button` or `market-filter-button`.
 * @slot content - Content slotted here will appear in `market-popover`, which
 * becomes visible when the slotted trigger content is interacted with.
 * @part popover - The inner market-popover.
 */
export declare class MarketButtonDropdown {
    el: HTMLMarketButtonDropdownElement;
    /**
     * Defines what types of interaction the button dropdown should have
     * (see `market-dropdown` docs for more granular explanation)
     */
    readonly interaction: 'click' | 'hover' | 'persistent';
    /**
     * Functionally and visually disables the button dropdown.
     */
    readonly disabled: boolean;
    /**
     * Disabling the up/down caret.
     */
    readonly noCaret: boolean;
    /**
     * Configuration option for Popper.js (used to position `<market-popover>`).
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
     * Disables the default behavior of *not* persisting selections in slotted `market-list`s.
     */
    readonly persistListSelections: boolean;
    /**
     * Fired whenever the button dropdown is opened.
     */
    marketButtonDropdownOpened: EventEmitter;
    /**
     * Fired whenever the button dropdown is closed.
     */
    marketButtonDropdownClosed: EventEmitter;
    dropdownIsActive: boolean;
    ariaAttributes: AriaAttributes;
    slottedButton: TDropdownTriggerElement;
    slottedList: HTMLMarketListElement;
    mutationObserver: MutationObserver;
    onMutationObserved: (ariaAttributes: AriaAttributes) => void;
    dropdownOpenedEventHandler(e: CustomEvent<void>): void;
    dropdownClosedEventHandler(e: CustomEvent<void>): void;
    syncTriggerDisabledState(): void;
    setCaret(): void;
    registerTrigger(): void;
    componentWillLoad(): void;
    componentWillRender(): void;
    render(): any;
}
