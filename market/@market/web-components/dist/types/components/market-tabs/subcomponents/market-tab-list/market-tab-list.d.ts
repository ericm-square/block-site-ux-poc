import { EventEmitter } from '../../../../stencil-public-runtime';
import { TMarketTabListSelectedTabChangedEventDetail, TMarketTabSelectedChangedEventDetail } from '../../events';
/**
 * @slot - Default slot for `<market-tab>`s
 */
export declare class MarketTabList {
    el: HTMLMarketTabListElement;
    tabEls?: HTMLMarketTabElement[];
    /**
     * Tabs' size
     *
     * @default undefined
     */
    readonly size?: 'small' | 'medium' | 'large';
    /**
     * String for the selected tab (i.e. `market-tab`'s `id` attribute)
     *
     * Omitting or setting to empty string will default to the first non-disabled tab
     *
     * @default undefined
     */
    selectedTab?: string;
    /**
     * String for the default selected tab (i.e. `market-tab`'s `id` attribute)
     *
     * Only used when the component initially loads
     *
     * @default undefined
     */
    readonly defaultTab?: string;
    /**
     * Fired when a `market-tab` is selected
     */
    marketTabListSelectedTabChanged: EventEmitter<TMarketTabListSelectedTabChangedEventDetail>;
    marketTabSelectedChangedEventHandler(e: CustomEvent<TMarketTabSelectedChangedEventDetail>): void;
    tabWatcher(newTabId: string): void;
    sizeWatcher(newSize: typeof this.size): void;
    selectTab(tabId?: string): void;
    propagateSizeProp(size: typeof this.size): void;
    focusOnTab(el: HTMLMarketTabElement): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleSlotChange(): void;
    componentWillLoad(): void;
    render(): any;
}
