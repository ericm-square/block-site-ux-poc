import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class MarketColorSwatch {
    el: HTMLMarketColorSwatchElement;
    /**
     * Value representing the color of the swatch. This is a string that can represent any [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color).
     */
    readonly value: string;
    readonly name: string;
    readonly disabled: boolean;
    /**
     * Whether the swatch is selected or not.
     */
    selected: boolean;
    /**
     * Fired whenever the swatch selection state changes.
     */
    marketColorSwatchSelectedChange: EventEmitter<{
        value: string;
        selected: boolean;
    }>;
    toggleSelection(): void;
    render(): any;
}
