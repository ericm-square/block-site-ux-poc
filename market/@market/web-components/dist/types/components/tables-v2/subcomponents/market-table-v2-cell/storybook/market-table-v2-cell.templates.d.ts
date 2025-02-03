import { TSlottedAccessoryTypes } from '../../../../../../docs/helpers/slotted-accessory';
export type TMarketTableV2CellTemplateArgs = Partial<HTMLMarketTableV2CellElement> & {
    actions?: boolean;
    content?: string;
    control?: 'none' | 'checkbox' | 'toggle';
    formField?: 'none' | 'input' | 'select' | 'password';
    formFieldLabel?: string;
    formFieldPlaceholder?: string;
    formFieldValue?: string;
    leadingAccessory?: TSlottedAccessoryTypes;
    trailingAccessory?: TSlottedAccessoryTypes;
    role?: string;
};
export declare const MarketTableV2CellTemplate: ({ actions, content, control, formField, formFieldLabel, formFieldPlaceholder, formFieldValue, leadingAccessory, trailingAccessory, role, active, align, caret, caretAriaLabelCollapsed, caretAriaLabelExpanded, disabled, indent, interactive, nowrap, selected, sortable, sortAriaLabelAscending, sortAriaLabelDescending, sortAriaLabelNone, sortOrder, sortStrategy, sortStrategyFormat, sticky, valign, }: TMarketTableV2CellTemplateArgs) => import("lit").TemplateResult<1>;
