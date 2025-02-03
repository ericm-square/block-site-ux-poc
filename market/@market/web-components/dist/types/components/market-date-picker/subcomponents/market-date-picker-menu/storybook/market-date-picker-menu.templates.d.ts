export type TMarketDatePickerMenuTemplateArgs = Partial<HTMLMarketDatePickerMenuElement> & {
    rowYesterday?: string;
    rowToday?: string;
    rowLastWeek?: string;
    rowThisWeek?: string;
    rowLastMonth?: string;
    rowThisMonth?: string;
    rowLastYear?: string;
    rowThisYear?: string;
    rowCustom?: string;
};
export declare const DatePickerMenuTemplate: ({ timeframe, rowYesterday, rowToday, rowLastWeek, rowThisWeek, rowLastMonth, rowThisMonth, rowLastYear, rowThisYear, rowCustom, }: TMarketDatePickerMenuTemplateArgs) => import("lit").TemplateResult<1>;
