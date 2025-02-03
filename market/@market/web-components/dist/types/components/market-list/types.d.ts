export type TMarketListItem = HTMLMarketRowElement | HTMLMarketActionCardElement;
export type TMarketListValidControlRowInputElement = HTMLMarketCheckboxElement | HTMLMarketToggleElement | HTMLMarketRadioElement;
export type TMarketListFilterStrategyPropCallback = (attrs: {
    item: TMarketListItem;
    label: string;
    query: string;
    textContent: string;
    value: string;
}) => boolean;
export type TMarketListFilterStrategyPropTypes = 'label' | 'textcontent' | 'value' | TMarketListFilterStrategyPropCallback;
export declare enum ListItemSelectableType {
    RADIO = 0,
    CHECKBOX = 1,
    SWITCH = 2,
    SELECTABLE_WITHOUT_CONTROL = 3
}
