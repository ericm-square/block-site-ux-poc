import type { Components, JSX } from "../types/components";

interface MarketInputPassword extends Components.MarketInputPassword, HTMLElement {}
export const MarketInputPassword: {
    prototype: MarketInputPassword;
    new (): MarketInputPassword;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
