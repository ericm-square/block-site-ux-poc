import type { Components, JSX } from "../types/components";

interface MarketQrcode extends Components.MarketQrcode, HTMLElement {}
export const MarketQrcode: {
    prototype: MarketQrcode;
    new (): MarketQrcode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
