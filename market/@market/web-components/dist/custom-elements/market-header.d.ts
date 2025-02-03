import type { Components, JSX } from "../types/components";

interface MarketHeader extends Components.MarketHeader, HTMLElement {}
export const MarketHeader: {
    prototype: MarketHeader;
    new (): MarketHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
