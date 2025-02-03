import { EventEmitter } from '../../stencil-public-runtime';
import { Dialog, DialogLoadedEvent, DialogElement } from '../../utils/dialog';
export declare class MarketContext {
    el: HTMLMarketContextElement;
    /**
     * **INTERNAL [do not use directly]**
     * Exposes the context's currentDialog for use by market-context-manager
     */
    currentDialog: Dialog;
    /**
     * **INTERNAL [do not use directly]**
     * Disabling the context's default veil (including scroll blocking behavior)
     * when visible. By default, this is set by market-context according to what
     * dialog type is being opened. In the future, we want to expose this as an
     * optional config option for market-context-manager's open() method.
     */
    noVeil: Boolean;
    /**
     * Whether the context is hidden or visible.
     */
    hidden: boolean;
    /**
     * The duration for the modal enter animation, set from design tokens
     */
    readonly animationEnterDuration: number;
    /**
     * The duration for the modal exit animation, set from design tokens
     */
    readonly animationExitDuration: number;
    stack: Array<Dialog>;
    totalCount: number;
    dialogMeta: object;
    /**
     * Emitted whenever the contents of the context have changed:
     * - Dialog added to the stack
     * - Dialog removed from the stack
     */
    marketContextContentsChanged: EventEmitter<{
        action: 'marketNewDialogOpened' | 'marketDialogClosed';
        currentDialog: Dialog;
        stack: Array<Dialog>;
    }>;
    /**
     * Emitted whenever the context's stack is empty (no more open dialogs)
     */
    marketContextEmptied: EventEmitter;
    currentDialogWatcher(newDialog: Dialog): void;
    stackWatcher(newValue: Array<Dialog>): void;
    doesStackContainDialogThatRequiresVeil(dialog: DialogElement): boolean;
    setContextVeil(): void;
    stackHasDialog(dialogEl: DialogElement): boolean;
    modalLoadedEventHandler(e: CustomEvent<DialogLoadedEvent>): void;
    dialogDismissedEventHandler(event: any): void;
    generateDialogID(type: string): string;
    getDialogByID(dialogID: string): Dialog;
    /**
     * Adds the passed dialogTemplate to the stack and inserts it into the DOM
     */
    open(dialogTemplate: any): Promise<void>;
    /**
     * **Recommended for internal use only**
     * Removes the topmost dialog from the stack or the dialog matching the passed `dialogID`
     * Note that using this will not trigger the dialog to emit a marketDialogDismissed event.
     *
     * The recommended path for closing a dialog is to call its dismiss() method.
     */
    close(dialogID?: string): Promise<void>;
    /**
     * **Recommended for internal use only**
     * Removes the topmost dialog from the stack (just an alias for default .close() behavior)
     * Note that using this will not trigger the dialog to emit a marketDialogDismissed event.
     *
     * The recommended path for closing a dialog is to call its dismiss() method.
     */
    closeCurrent(): Promise<void>;
    connectedCallback(): void;
    render(): any;
}
