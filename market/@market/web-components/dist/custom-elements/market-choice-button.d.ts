import type { Components, JSX } from "../types/components";

interface MarketChoiceButton extends Components.MarketChoiceButton, HTMLElement {}
export const MarketChoiceButton: {
    prototype: MarketChoiceButton;
    new (): MarketChoiceButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
