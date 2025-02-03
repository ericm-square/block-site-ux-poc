export declare const SlottedControlTypes: readonly ["none", "checkbox", "radio", "toggle"];
export type TSlottedControlTypes = (typeof SlottedControlTypes)[number];
export declare const SlottedControl: ({ type }: {
    type: TSlottedControlTypes;
}) => "" | import("lit").TemplateResult<1>;
