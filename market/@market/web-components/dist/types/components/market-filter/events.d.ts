import { TMarketDateRangeChangedEventDetail } from '../market-date-picker/events';
export type TMarketFilterDateRangeValues = Pick<TMarketDateRangeChangedEventDetail, 'startDate' | 'endDate'>;
export type TMarketFilterExpandedChangeEventDetail = boolean;
export type TMarketFilterValueDidChangeEventDetail = {
    name: string;
    prevValue: string | string[] | TMarketFilterDateRangeValues | null;
    value: string | string[] | TMarketFilterDateRangeValues | null;
};
