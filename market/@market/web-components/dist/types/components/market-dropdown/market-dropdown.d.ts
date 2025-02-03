import type { Placement, PositioningStrategy } from '@popperjs/core';
import { EventEmitter } from '../../stencil-public-runtime';
import { AriaAttributes } from '../../utils/aria';
import type { TDropdownTriggerElement } from '../../utils/dropdown';
/**
 * @slot trigger - Content slotted here will serve as the "trigger" for user
 * interaction that opens the element in the "content" slot. If it is a
 * `<market-button>`, `<market-filter-button>`, or `<market-link>`,
 * the dropdown will manage their disabled state.
 * @slot popover - Content slotted here will become visible when the slotted
 * trigger content is interacted with. Only tested with `<market-popover>`.
 *
 * To tweak popover position relative to the trigger, you can use the props
 * `popoverPlacement`, popoverSkidding`, and `popoverDistance`.
 */
export declare class MarketDropdown {
    el: HTMLMarketDropdownElement;
    /**
     * Defining how the popover should be triggered to open/close. Note that
     * clicks outside the dropdown will always close it.
     *
     * `click`: popover toggles open/closed on clicks to the trigger or popover
     *
     * `hover`: popover opens on trigger mouseover, closes on trigger or popover
     *  mouseout
     *
     * `persistent`: popover toggles open/closed on clicks to the trigger, popover
     * stays open if users click on it or its content
     *
     * `none`: popover does not toggle open/closed on any user interaction; it is
     * expected to be controlled by the parent component
     */
    readonly interaction: 'click' | 'hover' | 'persistent' | 'none';
    /**
     * Functionally disables the component, as well as relevant Market components
     * in the "trigger" slot (`<market-button>`, `<market-link>`).
     */
    readonly disabled: boolean;
    /**
     * Determines whether the dropdown is expanded or collapsed
     */
    expanded: boolean;
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
     * Fired whenever the dropdown is opened.
     */
    marketDropdownOpened: EventEmitter;
    /**
     * Fired whenever the dropdown is closed.
     */
    marketDropdownClosed: EventEmitter;
    ariaAttributes: AriaAttributes;
    /**
     * Popper instance
     */
    private popperInstance;
    /**
     * Clicks outside of the dropdown component will close the popover. This means
     * that only one dropdown can be open on screen at a time.
     */
    windowClick(e: MouseEvent): void;
    /**
     * Toggles the dropdown
     */
    onExpandedChange(newValue: boolean, oldValue: boolean): void;
    syncDisabledState(): void;
    /**
     * Toggles the dropdown opened or closed
     */
    toggleDropdown(): Promise<void>;
    /**
     * Opens the dropdown
     */
    openDropdown(): Promise<void>;
    /**
     * Closes the dropdown
     */
    closeDropdown(): Promise<void>;
    /**
     * Updates the popper's tooltip location
     * https://popper.js.org/docs/v2/lifecycle/#manual-update
     */
    updateDropdownPosition(): Promise<void>;
    handleInteraction(e: Event): Promise<void>;
    initializePopper(): void;
    updatePopoverConfig(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    slottedTriggerEl: TDropdownTriggerElement;
    mutationObserver: MutationObserver;
    registerTrigger(): void;
    onMutationObserved: (ariaAttributes: AriaAttributes) => void;
    componentWillLoad(): void;
    componentWillRender(): void;
    render(): any;
}
