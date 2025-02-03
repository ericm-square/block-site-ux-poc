import type { Components, JSX } from "../types/components";

interface MarketFooter extends Components.MarketFooter, HTMLElement {}
export const MarketFooter: {
    prototype: MarketFooter;
    new (): MarketFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
