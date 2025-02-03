import type { Components, JSX } from "../types/components";

interface MarketTooltip extends Components.MarketTooltip, HTMLElement {}
export const MarketTooltip: {
    prototype: MarketTooltip;
    new (): MarketTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
