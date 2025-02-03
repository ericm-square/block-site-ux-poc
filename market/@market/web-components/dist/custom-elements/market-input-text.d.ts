import type { Components, JSX } from "../types/components";

interface MarketInputText extends Components.MarketInputText, HTMLElement {}
export const MarketInputText: {
    prototype: MarketInputText;
    new (): MarketInputText;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
