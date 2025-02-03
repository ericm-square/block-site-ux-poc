import { EventEmitter } from '../../stencil-public-runtime';
import { AriaAttributes } from '../../utils/aria';
/**
 * @slot - The main label for the input.
 * @slot leading-accessory - An icon set on the left side of the input.
 * @slot trailing-accessory - An icon set on the right side of the input.
 *
 * @slot input - Can be used to slot your own HTML input, if needed (ex. if supporting browser
 * autofill)
 * @part native-input - The default inner HTML input.
 */
export declare class InputText {
    private nativeInput?;
    private slottedInput?;
    el: HTMLMarketInputTextElement;
    /**
     * Bind an ElementInternals object to a property which you can then use to interact with the surrounding form.
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals
     */
    internals: ElementInternals | undefined;
    /**
     * A string specifying the type of control to render. Any native HTML input type would work here.
     */
    readonly type: string;
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
    value: string;
    /**
     * A string specifying the placeholder of the input.
     * This is shown before a user attempts to add a value, given no value is already provided.
     */
    readonly placeholder: string;
    /**
     * A number specifying the maximum length of characters for the input value.
     * See MDN on the [maxlength attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength)
     */
    readonly maxlength: number;
    /**
     * A number specifying the minimum length of characters for the input value.
     * See MDN on the [minlength attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength)
     */
    readonly minlength: number;
    /**
     * String for setting input size.
     * Sizes `small` and `medium` visually hide the label,
     * but you should still provide one for accessibility purposes.
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * Specifies the increment step for number and time inputs.
     * See MDN on the [step attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step)
     */
    readonly step: string;
    /**
     * Specifies the minimum value for number and time inputs.
     * See MDN on the [min attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min)
     */
    readonly min: string;
    /**
     * Specifies the maximum value for number and time inputs.
     * See MDN on the [max attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max)
     */
    readonly max: string;
    /**
     * Specifies a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
     * to validate the input's value against.
     * See MDN on the [pattern attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
     */
    readonly pattern: string;
    /**
     * Whether or not the input is required; used to validate the input's value.
     * See MDN on the [required attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
     */
    readonly required: boolean;
    /**
     * A boolean representing whether the input is readonly or not.
     */
    readonly readonly: boolean;
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
    invalid: boolean;
    /**
     * Allows a browser to display an appropriate virtual keyboard.
     * [Accepted values](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
     */
    readonly inputmode: string;
    /**
     * A boolean representing whether the input should focus on page load.
     * If multiple elements with `autofocus` are present, it is not guaranteed which one
     * will ultimately receive the focus. It is advised that only one at most is present.
     */
    readonly autofocus: boolean;
    /**
     * Whether or not this input should allow autocompletion by the browser
     * Accepts a boolean, or "true", "false", "on", "off" or an
     * [accepted string value for the autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    readonly autocomplete: string | boolean;
    /**
     * Whether or not to automatically style this input as invalid based on
     * native input validation attributes: `min`, `max`, `pattern`, `required`, `maxlength`, `minlength`.
     * See MDN articles on [form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
     * and [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
     */
    readonly autovalidate: boolean;
    /**
     * Whether the input is displaying an initial autofill value. Used for
     * styling to ensure the label floats up correctly.
     */
    autofilled: boolean;
    ariaAttributes: AriaAttributes;
    mutationObserver: MutationObserver;
    sharedProps: {};
    _autocomplete: string;
    /**
     * Set when the component has been checked for validity through external APIs such as form submission
     * or the checkValidity function and doesn't satisfy its constraints.
     * See https://developer.mozilla.org/en-US/docs/web/api/htmlinputelement/invalid_event
     */
    validatingThroughSubmission: boolean;
    focusedChangeHandler(newValue: boolean): void;
    autocompleteWatcher(newValue: string | boolean): void;
    handleMarketDialogLoaded(): void;
    /**
     * Emitted whenever the input value changes.
     */
    marketInputValueChange: EventEmitter<{
        value: string;
        originalEvent: KeyboardEvent;
    }>;
    /**
     * Emitted when `market-input` is first fully rendered.
     */
    marketInputDidLoad: EventEmitter<{
        input: HTMLInputElement;
    }>;
    hasLeadingAccessory: boolean;
    hasTrailingAccessory: boolean;
    valueDidChange(e: any): void;
    handleAutofill(e: any): void;
    handleKeyDown(e: KeyboardEvent): void;
    /**
     * Handles the invalid submission event of this component.
     * This can happen when the component has been externally
     * checked for validity and does not satisfy the constraints.
     */
    handleSubmissionInvalid(event: Event): void;
    /**
     * Sets focus styling on `<market-input-text>`. Toggles focus on the inner `<input>` if true, and blurs focus if false.
     */
    setFocus(value?: boolean): Promise<void>;
    /**
     * Returns the native `<input>` element used under the hood.
     */
    getInputElement(): Promise<HTMLInputElement>;
    /**
     * Allows passing an alternative light DOM input.
     */
    registerSlottedInput(slottedInput?: HTMLInputElement): Promise<void>;
    updateSharedInputProps(): void;
    /**
     * Updates the internal state of this element bound to the surrounding form.
     */
    updateElementInternals(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    disconnectedCallback(): void;
    render(): any;
}
