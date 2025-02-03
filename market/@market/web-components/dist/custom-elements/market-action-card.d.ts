import type { Components, JSX } from "../types/components";

interface MarketActionCard extends Components.MarketActionCard, HTMLElement {}
export const MarketActionCard: {
    prototype: MarketActionCard;
    new (): MarketActionCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
