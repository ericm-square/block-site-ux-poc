import { AriaAttributes } from '../../utils/aria';
/**
 * @slot - The text used for the button label
 * @slot icon - an icon that is to the left of button text, or centered if there is no text
 */
export declare class MarketButton {
    el: HTMLMarketButtonElement;
    /**
     * String for setting (optional) button caret direction
     */
    readonly caret: 'up' | 'down' | 'none';
    /**
     * Functionally and visually disables the button
     */
    readonly disabled: boolean;
    /**
     * Causes the browser to treat the linked URL as a download. Only works for same-origin URLs.
     * Only applies when an `href` is provided.
     * See [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download) for details on accepted values.
     */
    readonly download: string | undefined;
    /**
     * Whether or not the button is in a focused state
     */
    focused: boolean;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    readonly href: string | undefined;
    /**
     * Whether the button only contains an icon.
     */
    iconOnly: boolean;
    /**
     * Optionally set a custom tabindex on the inner HTML `<button>`.
     */
    readonly innerTabindex: number;
    /**
     * Whether or not the button is in a loading state
     */
    readonly isLoading: boolean;
    /**
     * String for setting button rank
     */
    readonly rank: 'primary' | 'secondary' | 'tertiary';
    /**
     * Defines the relationship between a linked resource and the current document.
     * Only applies when an `href` is provided.
     * See [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) for details on accepted values.
     */
    readonly rel: string | undefined;
    /**
     * String for setting button size
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * Specifies where to display the linked URL.
     * Only applies when an `href` is provided.
     * See [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for details on accepted values.
     */
    readonly target: '_blank' | '_self' | '_parent' | '_top' | undefined;
    /**
     * String for setting button type
     */
    readonly type: 'button' | 'reset' | 'submit';
    /**
     * String for setting button variant
     */
    readonly variant: 'regular' | 'destructive';
    ariaAttributes: AriaAttributes;
    innerTag: HTMLElement;
    mutationObserver: MutationObserver;
    focusedChangeHandler(newValue: boolean): void;
    handleClick(event: UIEvent): void;
    /**
     * Sets `focused` state, except when disabled. Allows external consumers to programmatically
     * trigger focused styling.
     */
    setFocus(value?: boolean): Promise<void>;
    handleImplicitSubmission: () => void;
    onMutationObserved: (ariaAttributes: AriaAttributes) => void;
    handleSlotChange(): void;
    componentWillLoad(): void;
    render(): any;
    disconnectedCallback(): void;
}
