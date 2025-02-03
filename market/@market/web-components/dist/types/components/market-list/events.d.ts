export type TMarketListSelectionsDidChangeEventDetail = {
    currentSelections: Array<HTMLMarketRowElement | HTMLMarketActionCardElement>;
    currentSelectionValues: Array<string>;
    newDeselection: HTMLMarketRowElement | HTMLMarketActionCardElement;
    newDeselectionValue: string;
    newSelection: HTMLMarketRowElement | HTMLMarketActionCardElement;
    newSelectionValue: string;
    prevSelectionValues: Array<string>;
};
export type TMarketListItemsFilteredEventDetail = {
    items: Array<HTMLMarketRowElement | HTMLMarketActionCardElement>;
    prevItems: Array<HTMLMarketRowElement | HTMLMarketActionCardElement>;
};
