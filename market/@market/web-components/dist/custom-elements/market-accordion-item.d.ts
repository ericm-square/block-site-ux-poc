import type { Components, JSX } from "../types/components";

interface MarketAccordionItem extends Components.MarketAccordionItem, HTMLElement {}
export const MarketAccordionItem: {
    prototype: MarketAccordionItem;
    new (): MarketAccordionItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
