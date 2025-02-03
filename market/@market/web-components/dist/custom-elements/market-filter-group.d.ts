import type { Components, JSX } from "../types/components";

interface MarketFilterGroup extends Components.MarketFilterGroup, HTMLElement {}
export const MarketFilterGroup: {
    prototype: MarketFilterGroup;
    new (): MarketFilterGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
