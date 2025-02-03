import type { Components, JSX } from "../types/components";

interface MarketBanner extends Components.MarketBanner, HTMLElement {}
export const MarketBanner: {
    prototype: MarketBanner;
    new (): MarketBanner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
