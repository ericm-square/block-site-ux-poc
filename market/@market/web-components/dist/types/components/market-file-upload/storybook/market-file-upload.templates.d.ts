export type TMarketFileUploadTemplateArgs = Partial<HTMLMarketFileUploadElement> & {
    fileSubtext?: string;
    fileMetadata?: Array<File>;
};
export declare const demoFiles: File[];
export declare const MarketFileUploadTemplate: ({ accept, disabled, invalid, multiple, compact, fileSubtext, deleteButtonAriaLabel, }: TMarketFileUploadTemplateArgs) => import("lit").TemplateResult<1>;
