import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarketSegmentedControl {
    selectedSlider: HTMLElement;
    el: HTMLMarketSegmentedControlElement;
    items: NodeListOf<HTMLMarketSegmentElement>;
    /**
     * A string specifying a value for the segmented-control.
     * This value determines which segment is selected based on the segment value.
     */
    value: string;
    /**
     * A boolean representing whether the market-segmented-control is disabled or not.
     * This visually and functionally will disable the control area.
     */
    readonly disabled: boolean;
    valueWatcher(): void;
    /**
     * If a segment gets slotted in, set the value to match that of the row
     */
    disabledChangeHandler(): void;
    /**
     * Fired when the a new segment is selected
     */
    marketSegmentedSelectionDidChange: EventEmitter<{
        selectedSegment: HTMLMarketSegmentElement;
        selectedSegmentValue: string;
        deselectedSegment: HTMLMarketSegmentElement;
        deselectedSegmentValue: string;
    }>;
    /**
     * Select item that corresponds to passed value, or clear all values if value is empty string.
     */
    setSelectionsFromValue(): void;
    /**
     * Sets the initial state of the segmented-control by updating and propagating props and setting
     * default value.
     */
    setInternalState(): void;
    /**
     * Sets slider size to be the size of a segment
     */
    setSliderSize(): void;
    /**
     * Sets slider position (left offset) based on the currently selected item
     */
    setSliderPosition(selectedItem?: any): void;
    /**
     * Sets the initial state of the segmented-control by updating and propagating props and setting
     * default value.
     */
    defaultSlotchangeHandler(): void;
    marketSegmentSelectedEventHandler(e: CustomEvent): void;
    render(): any;
}
