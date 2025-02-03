import type { Components, JSX } from "../types/components";

interface MarketList extends Components.MarketList, HTMLElement {}
export const MarketList: {
    prototype: MarketList;
    new (): MarketList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
