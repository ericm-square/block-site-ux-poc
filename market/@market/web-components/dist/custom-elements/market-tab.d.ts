import type { Components, JSX } from "../types/components";

interface MarketTab extends Components.MarketTab, HTMLElement {}
export const MarketTab: {
    prototype: MarketTab;
    new (): MarketTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
