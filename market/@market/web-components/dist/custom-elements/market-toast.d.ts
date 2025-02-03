import type { Components, JSX } from "../types/components";

interface MarketToast extends Components.MarketToast, HTMLElement {}
export const MarketToast: {
    prototype: MarketToast;
    new (): MarketToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
