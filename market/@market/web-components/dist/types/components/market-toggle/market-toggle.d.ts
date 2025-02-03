import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarketToggle {
    el: HTMLMarketToggleElement;
    /**
     * Whether the toggle is checked or not.
     * If used as a slotted control inside of `market-row`, this will be overridden by the row's `selected` property.
     */
    checked: boolean;
    /**
     * Whether the toggle is disabled.
     */
    disabled: boolean;
    /**
     * Whether the toggle is focused or not.
     */
    focused: boolean;
    /**
     * Whether the toggle is hovered or not.
     */
    hovered: boolean;
    /**
     * Whether the toggle is active or not.
     */
    active: boolean;
    /**
     * Fired whenever "checked" prop value changes.
     */
    marketToggleChange: EventEmitter<{
        current: boolean;
        previous: boolean;
    }>;
    innerInput: HTMLInputElement;
    /**
     * Toggles `checked` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted toggles.
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
    handleClick(event: MouseEvent): void;
    render(): any;
}
