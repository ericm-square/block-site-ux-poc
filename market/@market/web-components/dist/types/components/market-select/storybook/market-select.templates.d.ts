import { TSlottedAccessoryTypes } from '../../../../docs/helpers/slotted-accessory';
import { TMarketListTemplateArgs } from '../../market-list/storybook/market-list.templates';
export type TMarketSelectTemplateArgs = Partial<HTMLMarketSelectElement> & {
    itemCount?: number;
    label?: string;
    leadingAccessory?: TSlottedAccessoryTypes;
    listArgs?: TMarketListTemplateArgs;
    selectedTranslation?: string;
    trailingAccessory?: TSlottedAccessoryTypes;
};
export declare const MarketSelectTemplate: ({ itemCount, label, leadingAccessory, listArgs, selectedTranslation, trailingAccessory, disabled, invalid, multiselect, name, placeholder, popoverContainer, popoverStrategy, readonly, required, size, value, }: TMarketSelectTemplateArgs) => import("lit").TemplateResult<1>;
