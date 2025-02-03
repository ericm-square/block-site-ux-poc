import type { Components, JSX } from "../types/components";

interface MarketSheet extends Components.MarketSheet, HTMLElement {}
export const MarketSheet: {
    prototype: MarketSheet;
    new (): MarketSheet;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
