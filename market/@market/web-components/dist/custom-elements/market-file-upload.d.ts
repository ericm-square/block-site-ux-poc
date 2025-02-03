import type { Components, JSX } from "../types/components";

interface MarketFileUpload extends Components.MarketFileUpload, HTMLElement {}
export const MarketFileUpload: {
    prototype: MarketFileUpload;
    new (): MarketFileUpload;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
