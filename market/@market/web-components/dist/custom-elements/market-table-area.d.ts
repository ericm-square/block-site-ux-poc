import type { Components, JSX } from "../types/components";

interface MarketTableArea extends Components.MarketTableArea, HTMLElement {}
export const MarketTableArea: {
    prototype: MarketTableArea;
    new (): MarketTableArea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
