import type { Components, JSX } from "../types/components";

interface MarketCodeInput extends Components.MarketCodeInput, HTMLElement {}
export const MarketCodeInput: {
    prototype: MarketCodeInput;
    new (): MarketCodeInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
