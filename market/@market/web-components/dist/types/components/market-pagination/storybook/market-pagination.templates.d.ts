import { TemplateResult } from 'lit';
export type TPaginationTemplateArgs = Partial<HTMLMarketPaginationElement> & {
    pageSizeSlot?: string | TemplateResult;
    navLabelSlot?: string | TemplateResult;
    navFeedbackSlot?: string | TemplateResult;
};
export declare const PaginationTemplate: ({ currentPage, totalPages, hasNextPage, hasPreviousPage, pageSize, pageSizeSlot, navLabelSlot, navFeedbackSlot, pageSizeOptions, disabled, }: TPaginationTemplateArgs) => TemplateResult<1>;
