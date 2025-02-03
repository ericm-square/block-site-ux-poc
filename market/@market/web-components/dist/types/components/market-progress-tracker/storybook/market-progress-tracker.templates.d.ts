import { TemplateResult } from 'lit';
export type TProgressTrackerTemplateArgs = Partial<HTMLMarketProgressTrackerElement> & {
    content?: string | TemplateResult;
    numOfSteps?: number;
    subtext?: string;
};
export declare const ProgressTrackerTemplate: ({ connectorless, content, compact, currentStepIndex, indicator, interactive, numOfSteps, orientation, reversed, size, subtext, }: Partial<TProgressTrackerTemplateArgs>) => TemplateResult<1>;
