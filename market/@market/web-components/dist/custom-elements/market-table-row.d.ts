import type { Components, JSX } from "../types/components";

interface MarketTableRow extends Components.MarketTableRow, HTMLElement {}
export const MarketTableRow: {
    prototype: MarketTableRow;
    new (): MarketTableRow;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
