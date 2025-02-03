import { MENU_SLOT_NAMES } from './enums/menu';
export type TMarketDateRangeChangedEventDetail = {
    endDate: string;
    menuSelection: string;
    prevEndDate: string;
    prevStartDate: string;
    startDate: string;
};
export type TMarketDatePickerMenuSelectionChangedEventDetail = {
    menuSelection: `${MENU_SLOT_NAMES}`;
};
