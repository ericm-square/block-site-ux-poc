import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The text used for the choice button label
 * @slot secondary-text - text to the right side of choice button
 */
export declare class MarketChoiceButton {
    el: HTMLMarketChoiceButtonElement;
    /**
     * Functionally and visually disables the choice button
     */
    readonly disabled: boolean;
    /**
     * Whether or not the choice button is in a selected state
     */
    selected: boolean;
    /**
     * String for setting choice button size
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * Emitted when the choice button is selected
     */
    marketChoiceButtonSelected: EventEmitter;
    /**
     * Emitted when the choice button is deselected
     */
    marketChoiceButtonDeselected: EventEmitter;
    onClick(e: Event): void;
    render(): any;
}
