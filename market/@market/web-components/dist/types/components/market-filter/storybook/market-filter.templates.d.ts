import { TemplateResult } from 'lit';
import { TMarketListTemplateArgs } from '../../market-list/storybook/market-list.templates';
type TDatePickerProps = Partial<Pick<HTMLMarketDatePickerElement, 'displayedDate' | 'displayMenu' | 'selectedStartDate' | 'selectedEndDate' | 'selectionType'>>;
export type TFilterTemplateArgs = Partial<HTMLMarketFilterElement> & TDatePickerProps & {
    content?: TemplateResult;
    displayValueText?: string;
    filterType?: 'list' | 'date';
    labelText?: string;
    listRowArgMap?: TMarketListTemplateArgs['rowArgMap'];
    listMultiselect?: boolean;
    listValue?: string;
};
export declare const FilterListTemplate: ({ disabled, displayValueText, dropdownInteraction, labelText, listMultiselect, listRowArgMap, listValue, name, popoverPlacement, size, }: TFilterTemplateArgs) => TemplateResult<1>;
export declare const FilterDateTemplate: ({ disabled, displayedDate, displayMenu, displayValueText, dropdownInteraction, labelText, name, popoverPlacement, selectedEndDate, selectedStartDate, selectionType, size, }: TFilterTemplateArgs) => TemplateResult<1>;
export {};
