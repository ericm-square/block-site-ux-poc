import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot trailing-accessory - An icon set on the right side of the input.
 */
export declare class MarketCodeInput {
    el: HTMLMarketCodeInputElement;
    /**
     * A string specifying the type of input to render (text or numeric)
     */
    readonly type: 'text' | 'number' | 'password';
    /**
     * A string specifying a name for the code input.
     */
    readonly name: string;
    /**
     * A number specifying the length of the code
     */
    readonly length: number;
    /**
     * A boolean representing whether the code input is focused or not.
     */
    focused: boolean;
    /**
     * A string representing a default value (code) that can be passed in to be rendered
     */
    value: string;
    /**
     * A boolean representing whether the input is readonly or not.
     */
    readonly readonly: boolean;
    /**
     * A boolean representing whether the input is invalid or not.
     * This represents error states.
     */
    readonly invalid: boolean;
    /**
     * A boolean representing whether the input is disabled or not.
     * This visually and functionally will disable the input.
     */
    readonly disabled: boolean;
    _code: Array<string>;
    /**
     * Emitted whenever any of the input values change.
     */
    marketCodeInputValueChange: EventEmitter<{
        code: string;
    }>;
    valueChangeHandler(value: string): void;
    /**
     * Trigger focus styling on `<market-input-text>`
     * and focus the cursor on the first empty `<input />`.
     */
    setFocus(value?: boolean): Promise<void>;
    isNumber(value: string): boolean;
    isValidChar(char: any): boolean;
    focusFirstEmptyInput(): void;
    /**
     * Inits this._code to the passed-in `value` prop or to an
     * empty array representation of the code input i.e ['', '', '', '']
     * Called only once on componentWillLoad() as to not cause re-renders
     */
    initCode(value: any): void;
    sanitizeValue(value: string): string;
    getValueFromInputs(): string;
    setInputsFromValue(value: string): void;
    spreadChars(e: any): void;
    insertChars(input: any, chars: Array<string>): void;
    updateValue(): void;
    onInput(e: any): void;
    onFocus(e: any): void;
    onBlur(): void;
    onKeyDown(e: any): void;
    onKeyUp(e: any): void;
    onHostClick(): void;
    componentWillLoad(): void;
    render(): any;
}
