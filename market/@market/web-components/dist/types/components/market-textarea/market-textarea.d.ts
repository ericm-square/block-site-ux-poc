import { EventEmitter } from '../../stencil-public-runtime';
import { AriaAttributes } from '../../utils/aria';
/**
 * @slot - The main label for the textarea.
 * @slot textarea - Can be used to slot your own custom textarea element.
 * @part container - The containing div for the textarea and label.
 */
export declare class MarketTextarea {
    private slottedTextarea?;
    el: HTMLMarketTextareaElement;
    /**
     * A string specifying the placeholder of the textarea.
     * This is shown before a user attempts to add a value, given no value is already provided.
     */
    readonly placeholder: string;
    /**
     * A string specifying a name for the textarea.
     */
    readonly name: string;
    /**
     * A string specifying a value for the textarea. This will be visually shown on the textarea and can be edited by the user.
     */
    value: string;
    /**
     * A string specifying the maximum length of characters for the input value.
     */
    readonly maxlength: string;
    /**
     * A boolean representing whether the textarea is readonly or not.
     */
    readonly readonly: boolean;
    /**
     * A boolean representing whether the textarea is disabled or not.
     * This visually and functionally will disable the textarea.
     */
    readonly disabled: boolean;
    /**
     * A boolean representing whether the textarea is focused or not.
     */
    focused: boolean;
    /**
     * A boolean representing whether the textarea is invalid or not.
     * This represents error states.
     */
    readonly invalid: boolean;
    /**
     * A string specifying the maximum height in pixels for the textarea. Vertical resizing will be limited to this height. Example value: '200px'.
     *
     * **DEPRECATED**: set `max-height` via CSS
     *
     * @default '320px'
     */
    readonly maxHeight: string;
    /**
     * A boolean representing whether the input should focus on page load.
     * If multiple elements with `autofocus` are present, it is not guaranteed which one
     * will ultimately receive the focus. It is advised that only one at most is present.
     */
    readonly autofocus: boolean;
    /**
     * Allows a browser to display an appropriate virtual keyboard.
     * [Accepted values](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
     */
    readonly inputmode: string;
    /**
     * Fired whenever the value of the textarea changes.
     */
    marketTextareaValueChange: EventEmitter<{
        value: string;
        originalEvent: KeyboardEvent;
    }>;
    ariaAttributes: AriaAttributes;
    mutationObserver: MutationObserver;
    sharedProps: {};
    handleMarketDialogLoaded(): void;
    /**
     * Allows passing an alternative light DOM textarea.
     * Sets the this.slottedTextarea value to undefined if there is no slotted element.
     */
    registerSlottedTextarea(slottedTextarea?: HTMLTextAreaElement): Promise<void>;
    syncSharedPropsToSlottedTextarea(prevSharedProps: any): void;
    updateSharedPropsAndSyncSlottedTextarea(): void;
    onMutationObserved: (ariaAttributes: AriaAttributes) => void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    textareaValueDidChange(e: any): void;
    setFocus(value?: boolean): void;
    render(): any;
    disconnectedCallback(): void;
}
