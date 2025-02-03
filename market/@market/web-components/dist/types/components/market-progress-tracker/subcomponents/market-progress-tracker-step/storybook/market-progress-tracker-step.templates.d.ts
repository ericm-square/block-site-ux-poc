import { TemplateResult } from 'lit';
export type TProgressTrackerStepTemplateArgs = Partial<HTMLMarketProgressTrackerStepElement> & {
    content?: string | TemplateResult;
    label?: string;
    subtext?: string;
};
export declare const ProgressTrackerStepTemplate: ({ active, compact, completed, connector, content, indicator, interactive, label, name, orientation, size, subtext, }: Partial<TProgressTrackerStepTemplateArgs>) => TemplateResult<1>;
