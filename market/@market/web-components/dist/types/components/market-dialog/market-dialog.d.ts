/// <reference types="node" />
import { EventEmitter } from '../../stencil-public-runtime';
import { DialogDismissedEvent, DialogLoadedEvent, DialogType } from '../../utils/dialog';
import { FocusTrap, FocusTrapActivateOptions, FocusTrapDeactivateOptions, FocusTrapOptions } from '../../utils/focus-trap';
/**
 * @slot - The main content of the dialog. Use `<section class="main">` tag.
 */
export declare class MarketDialog {
    el: HTMLMarketDialogElement;
    connectedCallbackTimeout: NodeJS.Timeout;
    type: DialogType;
    focusTrap: FocusTrap;
    header: HTMLMarketHeaderElement;
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
     * Whether the activity indicator is rendered or not
     */
    readonly isLoading: boolean;
    /**
     * Whether the dialog is persistent or dismissable
     */
    readonly persistent: boolean;
    /**
     * Enforces focus trapping on the dialog
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
    /**
     * Triggered when the dialog finishes loading
     */
    marketDialogLoaded: EventEmitter<DialogLoadedEvent>;
    /**
     * Triggered when the dialog is dismissed, handled by context manager
     */
    marketDialogDismissed: EventEmitter<DialogDismissedEvent>;
    /**
     * Triggered when the dialog is fully dismissed
     */
    marketDialogDidDismiss: EventEmitter<DialogDismissedEvent>;
    /**
     * Emits the dismiss event
     * The parent context will handle actually removing elements from the DOM,
     * All the dialog needs to do it emit an event so actually closing it can be
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
    removeTopMarginOfFirstHeading(): void;
    handleSlotchange(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): any;
}
