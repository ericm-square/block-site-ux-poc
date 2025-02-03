import { AriaAttributes } from '../../utils/aria';
/**
 * @slot - The text used for the link.
 */
export declare class MarketLink {
    el: HTMLMarketLinkElement;
    /**
     * String that represents the URL the link goes to.
     * If not present, the internal tag will be a `<button>` rather than `<a>` in order to align with a11y best practices.
     */
    readonly href: string;
    /**
     * Specifies where to open the linked URL.
     * See [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for details on accepted values.
     */
    readonly target: '_blank' | '_self' | '_parent' | '_top' | undefined;
    /**
     * Defines the relationship between a linked resource and the current document.
     * Only applies when an `href` is provided.
     * See [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) for details on accepted values.
     */
    readonly rel: string | undefined;
    /**
     * Gives the link destructive styling.
     */
    readonly destructive: boolean;
    /**
     * Visually disables the link and prevents navigating to the link on click.
     */
    readonly disabled: boolean;
    /**
     * Causes the browser to treat the linked URL as a download. Only works for same-origin URLs.
     * Only applies when an `href` is provided.
     * See [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download) for details on accepted values.
     */
    readonly download: string | undefined;
    /**
     * Links that exist within a larger block of text need to rely on more than color to meet accessibility standards.
     */
    readonly highlight: null | false | 'underline';
    ariaAttributes: AriaAttributes;
    mutationObserver: MutationObserver;
    onMutationObserved: (ariaAttributes: AriaAttributes) => void;
    componentWillLoad(): void;
    handleClick(e: Event): void;
    render(): any;
    disconnectedCallback(): void;
}
