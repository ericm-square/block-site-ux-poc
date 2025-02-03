import { TSlottedAccessoryTypes } from '../../../../docs/helpers/slotted-accessory';
export type TMarketTableCellTemplateArgs = Partial<HTMLMarketTableCellElement> & {
    content?: string;
    formField?: 'none' | 'input' | 'select' | 'password';
    formFieldLabel?: string;
    formFieldPlaceholder?: string;
    formFieldValue?: string;
    leadingAccessory?: TSlottedAccessoryTypes;
    trailingAccessory?: TSlottedAccessoryTypes;
};
export declare const MarketTableCellTemplate: ({ content, formField, formFieldLabel, formFieldPlaceholder, formFieldValue, leadingAccessory, trailingAccessory, active, align, column, disabled, interactive, leadingIndentation, }: TMarketTableCellTemplateArgs) => import("lit").TemplateResult<1>;
