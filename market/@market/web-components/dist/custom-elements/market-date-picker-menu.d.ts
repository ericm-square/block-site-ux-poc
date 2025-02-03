import type { Components, JSX } from "../types/components";

interface MarketDatePickerMenu extends Components.MarketDatePickerMenu, HTMLElement {}
export const MarketDatePickerMenu: {
    prototype: MarketDatePickerMenu;
    new (): MarketDatePickerMenu;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
