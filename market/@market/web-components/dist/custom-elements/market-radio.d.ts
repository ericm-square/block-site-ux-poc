import type { Components, JSX } from "../types/components";

interface MarketRadio extends Components.MarketRadio, HTMLElement {}
export const MarketRadio: {
    prototype: MarketRadio;
    new (): MarketRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
