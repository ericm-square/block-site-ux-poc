import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @part native-input - the native input element.
 */
export declare class MarketStepper {
    el: HTMLMarketStepperElement;
    inputEl: HTMLInputElement;
    /**
     * The value for the input. This is visually shown on the input
     * and can be edited by the user.
     */
    value: number;
    /**
     * The ID for the inner input.
     */
    readonly inputId: string;
    /**
     * The name for the inner input.
     */
    readonly name: string;
    /**
     * The placeholder of the input. Shown before a user attempts to
     * add a value, given no value is already provided.
     */
    readonly placeholder: string;
    /**
     * A number specifying the greatest value in the range of permitted values.
     * (See MDN on the [max attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max))
     */
    readonly max: number;
    /**
     * A number specifying the most negative value in the range of permitted values.
     * (See MDN on the [min attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min))
     */
    readonly min: number;
    /**
     * A positive number specifying the increment step.
     * (See MDN on the [step attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step))
     */
    readonly step: number;
    /**
     * Whether the input is readonly or not.
     */
    readonly readonly: boolean;
    /**
     * Whether the input is disabled or not.
     * This visually and functionally disables the input.
     */
    readonly disabled: boolean;
    /**
     * Whether the input is focused or not.
     */
    focused: boolean;
    /**
     * Whether the input is invalid or not. This represents error states.
     */
    readonly invalid: boolean;
    /**
     * The inner input's aria-label. Localize as needed.
     */
    readonly inputAriaLabel: string;
    /**
     * The decrement button's aria-label. Localize as needed.
     */
    readonly decrementAriaLabel: string;
    /**
     * The increment button's aria-label. Localize as needed.
     */
    readonly incrementAriaLabel: string;
    incrementDisabled: boolean;
    decrementDisabled: boolean;
    /**
     * Emitted when the value changes.
     */
    marketStepperValueChange: EventEmitter;
    /**
     * Emitted when the inner `<input>` element is focused.
     */
    marketStepperInputFocus: EventEmitter;
    valueChangeHandler(): void;
    /**
     * Toggle focus styling on `<market-stepper>` and focus/blur the inner `<input />`.
     */
    setFocus(value?: boolean): Promise<void>;
    onChange(): void;
    onInputFocus(): void;
    onDecrementClick(): void;
    onIncrementClick(): void;
    onKeyDown(e: KeyboardEvent): void;
    stepValue(step: number): void;
    sanitizeValue(value: number): number;
    updateButtonDisabledStates(): void;
    emitChangeEvent(previousValue: any): void;
    emitInputFocusEvent(): void;
    componentWillRender(): void;
    render(): any;
}
