import type { Components, JSX } from "../types/components";

interface MarketModalFull extends Components.MarketModalFull, HTMLElement {}
export const MarketModalFull: {
    prototype: MarketModalFull;
    new (): MarketModalFull;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
