import type { Components, JSX } from "../types/components";

interface MarketRow extends Components.MarketRow, HTMLElement {}
export const MarketRow: {
    prototype: MarketRow;
    new (): MarketRow;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
