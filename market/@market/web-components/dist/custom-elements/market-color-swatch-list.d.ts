import type { Components, JSX } from "../types/components";

interface MarketColorSwatchList extends Components.MarketColorSwatchList, HTMLElement {}
export const MarketColorSwatchList: {
    prototype: MarketColorSwatchList;
    new (): MarketColorSwatchList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
