import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketInputSearchFocusEventDetail, TMarketInputSearchValueChangeEventDetail, TMarketInternalInputSearchCompactAnimationEventDetail } from './events';
/**
 * @slot input - Can be used to slot your own HTML input, if needed (ex. if supporting browser
 * autofill)
 * @part native-input - The default inner HTML input.
 */
export declare class InputText {
    el: HTMLMarketInputSearchElement;
    private nativeInputEl?;
    private slottedInputEl?;
    /**
     * Bind an ElementInternals object to a property which you can then use to interact with the surrounding form.
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals
     */
    internals: ElementInternals | undefined;
    /**
     * A string specifying a value for the input;
     * this will be visually shown on the input and can be edited by the user.
     */
    value: string;
    /**
     * A string specifying the placeholder of the input;
     * this is shown before a user attempts to add a value, given no value is already provided.
     */
    readonly placeholder: string;
    /**
     * A number specifying the maximum length of characters for the input value
     */
    readonly maxlength: number;
    /**
     * A string specifying the size of the input
     */
    readonly size: 'small' | 'medium';
    /**
     * @deprecated
     * **DEPRECATED (v4.5.0)** Use `size` instead.
     *
     * A string specifying the size of the input
     */
    readonly variant: 'small' | 'medium';
    /**
     * A boolean representing whether the input is disabled or not;
     * this visually and functionally will disable the input.
     */
    readonly disabled: boolean;
    /**
     * A boolean representing whether the input is focused or not
     */
    focused: boolean;
    /**
     * A boolean representing whether the input should focus on page load
     */
    readonly autofocus: boolean;
    /**
     * Whether or not this input should allow autocompletion by the browser;
     * accepts a boolean, or `"true"`, `"false"`, `"on"`, `"off"` or an
     * [accepted string value for the autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).
     *
     * Note (source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)):
     * In order to provide autocompletion, user-agents might require an input to have a:
     * 1. Have a `name` and/or `id` attribute;
     * 2. Be descendants of a `<form>` element;
     * 3. The form to have a submit button
     */
    readonly autocomplete: string | boolean;
    /**
     * A string specifying a name for the search input
     */
    readonly name: string;
    /**
     * A string representing the input's aria-label; localize as needed
     */
    readonly inputAriaLabel: string;
    /**
     * A string representing the clear button's aria-label; localize as needed
     */
    readonly clearButtonAriaLabel: string;
    /**
     * A string representing the search icon button's aria-label; localize as needed
     */
    readonly searchIconButtonAriaLabel: string;
    /**
     * **INTERNAL [do not use directly]**
     *
     * Used by `market-filter-group` when setting this component to compact mode
     */
    readonly compact: boolean;
    /**
     * Emitted when input is cleared by clicking the clear button
     */
    marketInputSearchCleared: EventEmitter;
    /**
     * Emitted whenever the input value changes
     */
    marketInputSearchValueChange: EventEmitter<TMarketInputSearchValueChangeEventDetail>;
    /**
     * Emitted when the inner `<input>` element is focused or blurred
     */
    marketInputSearchFocus: EventEmitter<TMarketInputSearchFocusEventDetail>;
    /**
     * **INTERNAL [do not use directly]**
     *
     * Emitted when the compact animation has started or ended
     */
    marketInternalInputSearchCompactAnimation: EventEmitter<TMarketInternalInputSearchCompactAnimationEventDetail>;
    /**
     * Emitted when the component has loaded
     */
    marketInputSearchDidLoad: EventEmitter;
    /**
     * Properties to set on inner default or slotted <input> elements
     */
    private sharedProps;
    /**
     * What will actually get bound to the <input> element
     */
    private _autocomplete;
    /**
     * Prevents blurring when the clear button is clicked
     */
    private clearButtonClicked;
    /**
     * This toggles focus on the inner `<input>`.
     * When input is about to receive focus, force a `tabindex="-1"` on the `<Host>`.
     * Since the focus is already on the inner `<input>`, tabbing into `<Host>` is redundant.
     * When the input loses is focus, the previous `tabindex` value,
     * presumably assigned by the consumer, is assigned back.
     */
    focusedWatcher(newValue: boolean, oldValue: boolean): void;
    disabledWatcher(newValue: boolean): void;
    autocompleteWatcher(newValue: string | boolean): void;
    /**
     * Sets focus styling on `<market-input-search>`;
     * toggles focus on the native `<input>` depending on the value passed
     * @param value new `focused` value
     */
    setFocus(value?: boolean): Promise<void>;
    /**
     * Clears the current input value.
     */
    clearInput(): Promise<void>;
    /**
     * When the clear (X) button is clicked
     */
    handleClearButtonClicked(): Promise<void>;
    /**
     * Handle value change from an <input> event
     */
    handleValueChange(e: Event): void;
    /**
     * Handles `.input-container` animation changes
     */
    handleAnimation(e: AnimationEvent): void;
    handleAccessoryClicked(e: MouseEvent, isBackIcon: boolean): void;
    handleKeyDown(e: KeyboardEvent): void;
    /**
     * Allows passing an alternative light DOM input.
     */
    registerSlottedInput(slottedInput?: HTMLInputElement): void;
    /**
     * TODO: This should be a common util. -antonn
     */
    updateSharedInputProps(): void;
    /**
     * Updates the internal state of this element bound to the surrounding form.
     */
    updateElementInternals(): void;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    componentDidLoad(): void;
    render(): any;
}
