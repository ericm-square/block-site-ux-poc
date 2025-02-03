/// <reference types="node" />
import { EventEmitter } from '../../stencil-public-runtime';
import { DialogDismissedEvent, DialogLoadedEvent, DialogType } from '../../utils/dialog';
import { FocusTrap, FocusTrapActivateOptions, FocusTrapDeactivateOptions, FocusTrapOptions } from '../../utils/focus-trap';
import { TMarketHeaderNavigateEventDetail } from '../market-header/events';
export declare class MarketModalFull {
    el: HTMLMarketModalFullElement;
    connectedCallbackTimeout: NodeJS.Timeout;
    type: DialogType;
    focusTrap: FocusTrap;
    /**
     * INTERNAL ONLY: Used in CSS to trigger start and stop animations
     */
    hidden: boolean;
    /**
     * INTERNAL ONLY: Used by the context manager to identify a specific dialog/modal
     */
    readonly dialogID: string;
    /**
     * INTERNAL ONLY: Used by the context manager to identify a specific dialog/modal's place
     * in the stack
     */
    readonly index: number;
    /**
     * Sets the layout width for the main content area. Defaults to `regular`, which sets a
     * a maximum content width of 600px. You can also use `wide` for a max 1248px content area,
     * or `fluid` to have content fill the whole viewport.
     */
    readonly layout: 'regular' | 'wide' | 'fluid';
    /**
     * Enforces focus trapping on the modal
     */
    trapFocus: boolean;
    /**
     * The duration for the modal enter animation, set from design tokens
     */
    readonly animationEnterDuration: number;
    /**
     * The duration for the modal exit animation, set from design tokens
     */
    readonly animationExitDuration: number;
    layoutWatcher(): void;
    /**
     * Listen to the headerNavigate event emitted by a market-header child component
     * so we can emit a close event if needed
     */
    headerNavigateEventHandler(event: CustomEvent<TMarketHeaderNavigateEventDetail>): void;
    /**
     * Triggered when the modal finishes loading
     */
    marketDialogLoaded: EventEmitter<DialogLoadedEvent>;
    /**
     * Triggered when the modal is dismissed, handled by context manager
     */
    marketDialogDismissed: EventEmitter<DialogDismissedEvent>;
    /**
     * Triggered when the dialog is fully dismissed
     */
    marketDialogDidDismiss: EventEmitter<DialogDismissedEvent>;
    /**
     *  Repositions header inside of market-header to align with modal content */
    repositionHeader(): void;
    /**
     * Emits the dismiss event
     * The parent context will handle actually removing elements from the DOM,
     * All the modal needs to do it emit an event so actually closing it can be
     * some other elements problem
     */
    dismiss(dismissOptions?: Partial<DialogDismissedEvent>): Promise<void>;
    onTrapFocusChanged(newValue: boolean, oldValue: boolean): void;
    /**
     * Activates the focus trap
     *
     * See [`focus-trap.ts`](../../utils/focus-trap.ts) for default options
     *
     * @param {Object} [options] [focus-trap create options](https://github.com/focus-trap/focus-trap#createoptions)
     * @param {Object} [activateOptions] set options for [onActivate, onPostActivate, and checkCanFocusTrap](https://github.com/focus-trap/focus-trap#trapactivate)
     */
    activateFocusTrap(options?: FocusTrapOptions, activateOptions?: FocusTrapActivateOptions): Promise<void>;
    /**
     * Deactivates the focus trap
     *
     * @param {FocusTrapDeactivateOptions} [deactivateOptions] set options for [onDeactivate, onPostDeactivate, and checkCanReturnFocus](https://github.com/focus-trap/focus-trap#trapdeactivate)
     */
    deactivateFocusTrap(deactivateOptions?: FocusTrapDeactivateOptions): Promise<void>;
    connectedCallback(): void;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    render(): any;
}
