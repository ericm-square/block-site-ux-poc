import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class MarketColorSwatchList {
    el: HTMLMarketColorSwatchListElement;
    /**
     * A string specifying a value for the list.
     * For a color swatch to be selected, this value should match the swatch's value.
     * Note: all color swatch values slotted in must be **unique**!
     * An empty string, or '', will clear the selection.
     */
    value: string;
    /**
     * Fired whenever an item is selected or deselected.
     */
    marketColorSwatchListValueChange: EventEmitter<{
        value: string;
        prevValue: string;
    }>;
    valueWatcher(): void;
    colorSwatchSelectedEventHandler(e: CustomEvent): void;
    handleItemSelectedEvent(eventInfo: {
        value: string;
        selected: boolean;
    }): void;
    setSelectionFromValue(): void;
    handleSlotChange(): void;
    render(): any;
}
