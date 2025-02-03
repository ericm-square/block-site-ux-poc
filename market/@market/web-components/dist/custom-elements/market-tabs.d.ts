import type { Components, JSX } from "../types/components";

interface MarketTabs extends Components.MarketTabs, HTMLElement {}
export const MarketTabs: {
    prototype: MarketTabs;
    new (): MarketTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
