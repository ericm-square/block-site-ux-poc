import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarketCodeDisplay {
    el: HTMLMarketCodeDisplayElement;
    /**
     * Whether the component should appear in a disabled state.
     */
    disabled: boolean;
    /**
     * A boolean representing whether the code input is focused or not.
     */
    focused: boolean;
    /**
     * A string holding the code inputted by the user through a slot.
     */
    private code;
    /**
     * An array holding spans containing each character in the code, with some blanks.
     * Used for styling and spacing.
     */
    private codeChars;
    /**
     * The default 'Copy' button that is always present in any market-code-display.
     * Created and inserted into DOM in componentWillLoad().
     */
    private copyButton;
    /**
     * Emitted when the 'Copy' button is pressed. Can be used by consumer to create toast.
     */
    marketCodeCopied: EventEmitter;
    /**
     * Component Lifecycle Event:
     * Grab the code and its len from inputted code slot.
     * Set relevant props and insert the Copy button programmatically so that it appears in the light DOM.
     */
    componentWillLoad(): void;
    /**
     * Inits this.codeChars to an array of <span> tags containing each character in the code string.
     * Additionally contains empty strings at certain indices based on codeLen.
     * By default, blanks are only placed at the front & back of the array.
     *    ['', 'x', 'x', 'x', 'x', '']
     * If codeLen is divisible by 4, put blanks every 4 spots too.
     *    ['', 'x', 'x', 'x', 'x', '', 'x', 'x', 'x', 'x', '']
     * The exception to this is if codeLen===4, in which case we use the default.
     * This codeChars arr is used in render() to space and style characters appropriately.
     * Called only once on componentWillLoad() as to not cause re-renders
     */
    initCodeChars(code: any): void;
    /**
     * When user presses the 'Copy' button, copy code to clipboard & emit an event.
     */
    copyToClipboard(): void;
    render(): any;
}
