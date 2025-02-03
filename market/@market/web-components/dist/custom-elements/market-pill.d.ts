import type { Components, JSX } from "../types/components";

interface MarketPill extends Components.MarketPill, HTMLElement {}
export const MarketPill: {
    prototype: MarketPill;
    new (): MarketPill;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
