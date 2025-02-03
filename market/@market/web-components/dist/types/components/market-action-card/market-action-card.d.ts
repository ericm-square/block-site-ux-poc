import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketActionCardDeselectedEventDetail, TMarketActionCardSelectedEventDetail } from './events';
/**
 * @slot - Optimized for use w/ slotted `<market-row>`s but can take any content. All slotted `market-row`s will automatically be set to interactive mode.
 */
export declare class MarketActionCard {
    rowEl: HTMLMarketRowElement;
    el: HTMLMarketActionCardElement;
    /**
     * Whether the action card is selected or not.
     */
    selected: boolean;
    /**
     * Visually and functionally disables the action card.
     */
    readonly disabled: boolean;
    /**
     * A string specifying a value for the action card.
     */
    readonly value: string;
    /**
     * When set to `true`, card will not persist selected state on click.
     */
    readonly transient: boolean;
    /**
     * Fired whenever the action card is selected.
     */
    marketCardSelected: EventEmitter<TMarketActionCardSelectedEventDetail>;
    /**
     * Fired whenever the action card is deselected.
     */
    marketCardDeselected: EventEmitter<TMarketActionCardDeselectedEventDetail>;
    /**
     * When rows are slotted into cards, we want to catch their selection events
     * and emit our own, so that the containing `market-list` only gets one set
     * of selection events.
     */
    handleRowSelection(e: CustomEvent): void;
    /**
     * When rows are slotted into cards, we want to catch their selection events
     * and emit our own, so that the containing `market-list` only gets one set
     * of selection events.
     */
    handleRowDeselection(e: CustomEvent): void;
    /**
     * Set `selected` to `true` and emit `marketCardSelected`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    select(): Promise<void>;
    /**
     * Set `selected` to `false` and emit `marketCardDeselected`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    deselect(): Promise<void>;
    /**
     * Used for setting the selection state to true without emitting events.
     * Useful for scenarios where another component (ex. `<market-list>`) needs
     * to sync state with slotted `<market-action-card>`s.
     */
    silentlySelect(): Promise<void>;
    /**
     * Set `selected` to `false`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    silentlyDeselect(): Promise<void>;
    isContentEditable(el: any): any;
    handleClick(e: any): void;
    handleKeydown(e: KeyboardEvent): void;
    syncRowAttributes(): void;
    handleSlotChangeDefault(): void;
    componentDidRender(): void;
    render(): any;
}
