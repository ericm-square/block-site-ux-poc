import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarketRadio {
    el: HTMLMarketRadioElement;
    /**
     * Whether the radio button is selected (analogous to the HTML input attribute `checked`).
     * If used as a slotted control inside of `market-row`, this will be overridden by the row's `selected` property.
     */
    selected: boolean;
    /**
     * Whether the radio button is disabled.
     */
    disabled: boolean;
    /**
     * Whether the radio button is invalid.
     */
    readonly invalid: boolean;
    /**
     * Whether the radio is focused or not.
     */
    focused: boolean;
    /**
     * Whether the radio is hovered or not.
     */
    hovered: boolean;
    /**
     * Whether the radio is active or not.
     */
    active: boolean;
    /**
     * Fired whenever "selected" prop value changes.
     */
    marketRadioValueChange: EventEmitter<{
        current: boolean;
        previous: boolean;
    }>;
    innerInput: HTMLInputElement;
    /**
     * Toggles `selected` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted radio buttons.
     */
    setSelection(newValue: boolean, { silent }?: {
        silent?: boolean;
    }): Promise<void>;
    /**
     * DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).
     */
    setValue(newValue: boolean): Promise<void>;
    /**
     * Sets `active` state. Allows external elements to programmatically
     * trigger active styling, ex. when slotted as a control into `market-row`.
     */
    setActive(value: boolean): Promise<void>;
    /**
     * Sets `hovered` state. Allows external elements to programmatically
     * trigger hover styling, ex. when slotted as a control into `market-row`.
     */
    setHover(value: boolean): Promise<void>;
    /**
     * Sets `disabled` state. Allows external elements to programmatically
     * trigger disabled styling, ex. when slotted as a control into `market-row`.
     */
    setDisabled(value: boolean): Promise<void>;
    /**
     * Sets `focused` state, except when disabled.
     * Allows external consumers to programmatically
     * trigger focused styling.
     */
    setFocus(value?: boolean): Promise<void>;
    onFocus(): void;
    handleClick(event: MouseEvent): void;
    render(): any;
}
