import type { Components, JSX } from "../types/components";

interface MarketDropdown extends Components.MarketDropdown, HTMLElement {}
export const MarketDropdown: {
    prototype: MarketDropdown;
    new (): MarketDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
