import { ListItemSelectableType, TMarketListItem, TMarketListValidControlRowInputElement } from './types';
/**
 * Check if the value is considered empty
 * @param {unknown} value
 */
export declare function isValueEmpty(value: unknown): boolean;
/**
 * Check if the slotted control in <market-row slot="control-row> is a valid control row input
 * @param {unknown} control
 */
export declare function isValidControl(control: unknown): control is TMarketListValidControlRowInputElement;
/**
 * Get the selectable type (radio, checkbox, etc.) from a list item, which is either a market-row or market-action-card
 * @param {TMarketListItem} item
 */
export declare function getItemSelectableType(item: TMarketListItem): ListItemSelectableType | undefined;
