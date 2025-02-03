import type { Components, JSX } from "../types/components";

interface MarketTabList extends Components.MarketTabList, HTMLElement {}
export const MarketTabList: {
    prototype: MarketTabList;
    new (): MarketTabList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
