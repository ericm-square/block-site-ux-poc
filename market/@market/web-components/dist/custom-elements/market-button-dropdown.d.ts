import type { Components, JSX } from "../types/components";

interface MarketButtonDropdown extends Components.MarketButtonDropdown, HTMLElement {}
export const MarketButtonDropdown: {
    prototype: MarketButtonDropdown;
    new (): MarketButtonDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
