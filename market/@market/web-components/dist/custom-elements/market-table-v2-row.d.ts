import type { Components, JSX } from "../types/components";

interface MarketTableV2Row extends Components.MarketTableV2Row, HTMLElement {}
export const MarketTableV2Row: {
    prototype: MarketTableV2Row;
    new (): MarketTableV2Row;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
