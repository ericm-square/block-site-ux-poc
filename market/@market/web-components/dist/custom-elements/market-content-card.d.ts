import type { Components, JSX } from "../types/components";

interface MarketContentCard extends Components.MarketContentCard, HTMLElement {}
export const MarketContentCard: {
    prototype: MarketContentCard;
    new (): MarketContentCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
