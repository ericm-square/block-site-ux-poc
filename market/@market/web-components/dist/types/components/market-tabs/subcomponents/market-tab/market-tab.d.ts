import { EventEmitter } from '../../../../stencil-public-runtime';
import { TMarketTabSelectedChangedEventDetail } from '../../events';
/**
 * @slot - (Default slot) The text used for the button label
 * @part button - The `<button>` in the shadow DOM
 */
export declare class MarketTab {
    el: HTMLMarketTabElement;
    buttonEl: HTMLButtonElement;
    /**
     * Whether or not the tab is disabled
     *
     * @default false
     */
    readonly disabled: boolean;
    /**
     * Tab's size
     *
     * @default 'medium'
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * Whether or not the tab is selected
     *
     * @default false
     */
    selected: boolean;
    /**
     * Fired when the tab selection has changed
     *
     * `market-tab-list` listens to this event and stops further propagation
     */
    marketTabSelectedChanged: EventEmitter<TMarketTabSelectedChangedEventDetail>;
    /**
     * Select the tab and emits a `marketTabSelectedChanged` event
     */
    select(): Promise<void>;
    /**
     * Deselects the tab and emits a `marketTabSelectedChanged` event
     */
    deselect(): Promise<void>;
    disabledWatcher(): void;
    handleClick(): void;
    handleKeydown(e: KeyboardEvent): void;
    render(): any;
}
