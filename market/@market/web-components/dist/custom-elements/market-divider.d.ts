import type { Components, JSX } from "../types/components";

interface MarketDivider extends Components.MarketDivider, HTMLElement {}
export const MarketDivider: {
    prototype: MarketDivider;
    new (): MarketDivider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
