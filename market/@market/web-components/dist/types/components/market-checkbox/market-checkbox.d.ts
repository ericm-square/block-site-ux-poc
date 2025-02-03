import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarketCheckbox {
    el: HTMLMarketCheckboxElement;
    /**
     * Whether the checkbox is checked or unchecked. Operates independently of the indeterminate property.
     * If used as a slotted control inside of `market-row`, this will be overridden by the row's `selected` property.
     */
    checked: boolean;
    /**
     * Whether the checkbox is disabled.
     */
    disabled: boolean;
    /**
     * Whether the checkbox is indeterminate. If true, indeterminate visual state takes precedence over checked/unchecked.
     */
    indeterminate: boolean;
    /**
     * Whether the checkbox is invalid.
     */
    readonly invalid: boolean;
    /**
     * Whether the checkbox is focused or not.
     */
    focused: boolean;
    /**
     * Whether the checkbox is hovered or not.
     */
    hovered: boolean;
    /**
     * Whether the checkbox is active or not.
     */
    active: boolean;
    /**
     * Fired whenever "checked" prop value changes.
     */
    marketCheckboxValueChange: EventEmitter<{
        current: boolean;
        previous: boolean;
    }>;
    innerInput: HTMLInputElement;
    /**
     * Toggles `checked` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted checkboxes.
     */
    setSelection(newValue: boolean, { silent }?: {
        silent?: boolean;
    }): Promise<void>;
    /**
     * Toggles `indeterminate` prop. Operates independently of the `checked` property but if `true`,
     * indeterminate visual appearance takes precedence over checked/unchecked.
     */
    setIndeterminate(newValue: boolean): Promise<void>;
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
    handleClick(event: MouseEvent): void;
    getCheckedState(): boolean | 'indeterminate';
    componentDidRender(): void;
    render(): any;
}
