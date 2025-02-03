import { EventEmitter } from '../../stencil-public-runtime';
import { DialogElement } from '../../utils/dialog';
export declare class MarketContextManager {
    el: HTMLMarketContextManagerElement;
    /**
     * Whether or not the context manager is UI blocking
     */
    active: boolean;
    currentContext: HTMLMarketContextElement;
    stack: Array<HTMLMarketContextElement>;
    mouseDownEl: HTMLElement;
    childListObserver: MutationObserver;
    /**
     * Emitted when the context manager is activated/blocking is turned on
     */
    marketContextManagerActivated: EventEmitter;
    /**
     * Emitted when the context manager is deactivated/blocking is turned off
     */
    marketContextManagerDeactivated: EventEmitter;
    initChildListObserver(): void;
    getCurrentContext(): Promise<HTMLMarketContextElement>;
    contextEmptiedEventHandler({ target: emptiedContext }: {
        target: any;
    }): void;
    windowKeydown(e: KeyboardEvent): void;
    /**
     * Adds the passed dialogEl to the DOM and creates a new context if necessary or according to
     * `shouldCreateNewContext` if it is passed
     */
    open(dialogEl: DialogElement, shouldCreateNewContext?: boolean): Promise<void>;
    /**
     * Closes the dialog with matching ID
     */
    close(dialogID?: string): Promise<void>;
    /**
     * Adds a new market-context to the stack in the DOM and activates it
     */
    createNewContext(): Promise<void>;
    /**
     * Hides the entire context manager
     */
    deactivate(): Promise<void>;
    /**
     * Shows the context manager
     */
    activate(): Promise<void>;
    handleMouseEvents(e: any): void;
    componentDidLoad(): void;
    render(): any;
    disconnectedCallback(): void;
}
