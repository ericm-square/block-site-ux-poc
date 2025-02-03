export type TMarketDatePickerTemplateArgs = Partial<HTMLMarketDatePickerElement> & {
    slot?: string;
};
export declare const DatePickerTemplate: ({ slot, displayedDate, displayMenu, excludeMenuItems, invalid, isDateDisabled, locale, mobileMenuPosition, presetMenuOption, selectedEndDate, selectedStartDate, selectionType, timeframe, withInputs, yearViewActive, }: TMarketDatePickerTemplateArgs) => import("lit").TemplateResult<1>;
export declare const ButtonDropdownTemplate: (args: TMarketDatePickerTemplateArgs) => import("lit").TemplateResult<1>;
export declare const FieldDropdownTemplate: (args: TMarketDatePickerTemplateArgs) => import("lit").TemplateResult<1>;
export declare const TranslatedTemplate: () => import("lit").TemplateResult<1>;
