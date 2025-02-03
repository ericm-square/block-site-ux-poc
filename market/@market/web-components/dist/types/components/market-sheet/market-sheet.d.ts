import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketDragCoords, TMouseOrTouchEvent } from '../../utils/gesture/types';
import { DialogDismissedEvent, DialogLoadedEvent, DialogType } from '../../utils/dialog';
import { FocusTrap, FocusTrapActivateOptions, FocusTrapDeactivateOptions, FocusTrapOptions } from '../../utils/focus-trap';
type SheetState = 'closed' | 'partial-open' | 'full-open';
export declare class MarketSheet {
    el: HTMLMarketSheetElement;
    mainContent: HTMLElement;
    type: DialogType;
    focusTrap: FocusTrap;
    focusTrapActivateOptions: FocusTrapActivateOptions;
    topBoundary: number;
    compressionRatio: number;
    dragEventStack: [number, number][];
    touchStartCoords: TMarketDragCoords;
    dragDelta: TMarketDragCoords;
    dragStartTop: number;
    scrollStart: number;
    heightObserver: ResizeObserver;
    boundOnDragMove: any;
    boundOnDragEnd: any;
    boundOnScrollDrag: any;
    /**
     * @internal
     *
     * Used in CSS to trigger start and stop animations
     */
    hidden: boolean;
    /**
     * @internal
     *
     * Used by the context manager to identify a specific dialog/modal
     */
    readonly dialogID: string;
    /**
     * Default state sheet opens to when opened from close
     */
    openMode: 'full' | 'dynamic' | 'partial';
    /**
     * The duration for the modal enter animation, set from design tokens
     */
    readonly animationEnterDuration: number;
    /**
     * The duration for the modal exit animation, set from design tokens
     */
    readonly animationExitDuration: number;
    /**
     * Disable focus trapping on the modal
     */
    disableFocus: boolean;
    /**
     * Translated string to label Close handle
     */
    readonly closeHandleAriaLabel: string;
    /**
     * Triggered when the sheet finishes loading
     */
    marketDialogLoaded: EventEmitter<DialogLoadedEvent>;
    /**
     * Triggered when the sheet is dismissed, handled by context manager
     */
    marketDialogDismissed: EventEmitter<DialogDismissedEvent>;
    /**
     * Triggered when the dialog is fully dismissed
     */
    marketDialogDidDismiss: EventEmitter<DialogDismissedEvent>;
    /**
     * Activates the focus trap
     * @param {Object} [options] [focus-trap `.createFocusTrap` options](https://github.com/focus-trap/focus-trap#createoptions)
     * @param {Object} [activateOptions] [focus-trap `.activate` options](https://github.com/focus-trap/focus-trap#trapactivate)
     */
    activateFocusTrap(options?: FocusTrapOptions, activateOptions?: FocusTrapActivateOptions): Promise<void>;
    /**
     * Deactivates the focus trap
     * @param {Object} [deactivateOptions] [focus-trap `.deactivate` options](https://github.com/focus-trap/focus-trap#trapdeactivate)
     */
    deactivateFocusTrap(deactivateOptions?: FocusTrapDeactivateOptions): Promise<void>;
    /**
     * Emits the dismiss event
     * The parent context will handle actually removing elements from the DOM,
     * All the sheet needs to do it emit an event so actually closing it can be
     * some other elements problem
     */
    dismiss(options?: any): Promise<void>;
    setState(state: SheetState): void;
    resetTopByState(): void;
    calculateTopBoundary(): void;
    setTop(top: number): number;
    onDragStart(e: TMouseOrTouchEvent): void;
    onDragMove(e: TMouseOrTouchEvent): void;
    onDragEnd(e: TMouseOrTouchEvent): void;
    onScrollStart(): void;
    onScrollDrag(e: TouchEvent): void;
    pruneStack(timeStamp: number): void;
    getGestureDelta(e: TMouseOrTouchEvent, minSwipeDistance: number): number;
    cleanupDragging(): void;
    onKeyDown(e: KeyboardEvent): void;
    connectedCallback(): void;
    hiddenHandler(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    render(): any;
}
export {};
