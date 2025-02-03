import { EventEmitter } from '../../../../stencil-public-runtime';
import { MENU_SLOT_NAMES } from '../../enums/menu';
import { TMarketDatePickerMenuSelectionChangedEventDetail } from '../../events';
import { TMarketListSelectionsDidChangeEventDetail } from '../../../market-list/events';
/**
 * @slot 'today' - slot for market date picker menu today option;
 * @slot 'yesterday' - slot for market date picker menu yesterday option;
 * @slot 'this-week' - slot for market date picker menu this week option;
 * @slot 'last-week' - slot for market date picker menu last week option;
 * @slot 'this-month' - slot for market date picker menu this month option;
 * @slot 'last-month' - slot for market date picker menu last month option;
 * @slot 'this-year' - slot for market date picker menu this year option;
 * @slot 'last-year' - slot for market date picker menu last year option;
 * @slot 'custom' - slot for market date picker menu custom option;
 */
export declare class MarketDatePickerMenu {
    el: HTMLMarketDatePickerMenuElement;
    /**
     * String for setting timeframe type to select which menu items to show
     */
    readonly timeframe: 'past' | 'present' | 'future';
    /**
     * A list of menu items that will be excluded from appearing on the menu list.
     * i.e. `this-year,last-year` or `today,this-week,last-week,custom`
     * The menu names are lowercase and hyphenated strings, found here:
     * https://github.com/squareup/market/blob/main/web/web-components/src/components/market-date-picker/enums/menu.tsx
     *
     * This works in conjunction with timeframe,
     * i.e. "timeframe=past", excludes dates in the future in addition to the ones here.
     * This is written as items separated by ','.
     */
    readonly excludeMenuItems: string;
    /**
     * Preset menu option passed from the parent. For the menu, this handles visually selecting the menu row.
     */
    readonly presetMenuOption: MENU_SLOT_NAMES;
    /**
     * Fired whenever a menu item is selected
     */
    marketDatePickerMenuSelectionChanged: EventEmitter<TMarketDatePickerMenuSelectionChangedEventDetail>;
    handleMarketListSelectionsDidChange(e: CustomEvent<TMarketListSelectionsDidChangeEventDetail>): void;
    /**
     * Method to visually select Custom row for use by the date picker component
     * (internal use only)
     */
    _selectCustomRow(): Promise<void>;
    render(): any;
}
