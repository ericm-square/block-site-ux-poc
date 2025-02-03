import { TMarketRowTemplateArgs } from '../../market-row/storybook/market-row.templates';
export type TMarketActionCardTemplateArgs = Partial<HTMLMarketActionCardElement> & {
    content?: string;
    rowArgs?: TMarketRowTemplateArgs;
};
export declare const MarketActionCardTemplate: ({ content, rowArgs, selected, disabled, transient, value, }: TMarketActionCardTemplateArgs) => import("lit").TemplateResult<1>;
