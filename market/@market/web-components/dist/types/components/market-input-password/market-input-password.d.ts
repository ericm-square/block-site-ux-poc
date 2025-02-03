/**
 * @slot - The label for the input.
 *
 * @slot input - Can be used to slot your own HTML input, if needed (ex. if supporting browser
 * autofill)
 */
export declare class MarketInputPassword {
    el: HTMLMarketInputPasswordElement;
    /**
     * A string specifying an ID for the input.
     */
    readonly inputId: string;
    /**
     * A string specifying a name for the input.
     */
    readonly name: string;
    /**
     * A string specifying a value for the input. This will be visually shown on the input and can be edited by the user.
     */
    readonly value: string;
    /**
     * A string specifying the placeholder of the input.
     * This is shown before a user attempts to add a value, given no value is already provided.
     */
    readonly placeholder: string;
    /**
     * A number specifying the maximum length of characters for the input value.
     */
    readonly maxlength: number;
    /**
     * A number specifying the minimum length of characters for the input value.
     */
    readonly minlength: number;
    /**
     * String for setting input size.
     * Sizes `small` and `medium` visually hide the label,
     * but you should still provide one for accessibility purposes.
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * A boolean representing whether the input is readonly or not.
     */
    readonly readonly: boolean;
    /**
     * Whether or not the input is required; used to validate the input's value.
     * See MDN on the [required attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
     */
    readonly required: boolean;
    /**
     * A boolean representing whether the input is disabled or not.
     * This visually and functionally will disable the input.
     */
    readonly disabled: boolean;
    /**
     * A boolean representing whether the input is focused or not.
     */
    focused: boolean;
    /**
     * A boolean representing whether the input is invalid or not.
     * This represents error states.
     */
    readonly invalid: boolean;
    /**
     * Whether or not this input should allow autocompletion by the browser
     * Accepts a boolean, or "true", "false", "on", "off" or an
     * [accepted string value for the autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    readonly autocomplete: string | boolean;
    /**
     * Allows a browser to display an appropriate virtual keyboard.
     * [Accepted values](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
     */
    readonly inputmode: string;
    marketInputText: HTMLMarketInputTextElement;
    /**
     * Type specified for the password input. Toggled by the input's right icon (eye).
     */
    type: 'text' | 'password';
    /**
     * Sets focus styling on `<market-input-password>`. Toggles focus on the inner `<input>` if true, and blurs focus if false.
     */
    setFocus(value?: boolean): Promise<void>;
    slottedInput: HTMLInputElement;
    registerSlottedInput(): void;
    togglePasswordVisibility(e: Event): void;
    handleKeyDown(e: KeyboardEvent): void;
    renderSvgHidden(): any;
    renderSvgVisible(): any;
    render(): any;
}
