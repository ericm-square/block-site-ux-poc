import type { Components, JSX } from "../types/components";

interface MarketToaster extends Components.MarketToaster, HTMLElement {}
export const MarketToaster: {
    prototype: MarketToaster;
    new (): MarketToaster;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
