import type { Components, JSX } from "../types/components";

interface MarketCodeDisplay extends Components.MarketCodeDisplay, HTMLElement {}
export const MarketCodeDisplay: {
    prototype: MarketCodeDisplay;
    new (): MarketCodeDisplay;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
