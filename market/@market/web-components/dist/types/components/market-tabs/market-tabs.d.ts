import { TMarketTabSelectedChangedEventDetail } from './events';
export declare class MarketTabs {
    el: HTMLMarketTabsElement;
    tabListEl?: HTMLMarketTabListElement;
    panelEls?: HTMLMarketTabPanelElement[];
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
    marketTabSelectedChangedEventHandler(e: CustomEvent<TMarketTabSelectedChangedEventDetail>): void;
    tabWatcher(newTabId: string): void;
    setTab(tabId: string): void;
    showPanelWithId(panelId: string): void;
    handleSlotChange(): void;
    componentWillLoad(): void;
    render(): any;
}
