import { TemplateResult } from 'lit';
export type TMarketTabPanelTemplateArgs = Partial<HTMLMarketTabPanelElement> & {
    ariaLabelledby?: string;
    content?: string | TemplateResult;
};
export declare const TabPanelTemplate: ({ ariaLabelledby, hidden, id, content }: TMarketTabPanelTemplateArgs) => TemplateResult<1>;
