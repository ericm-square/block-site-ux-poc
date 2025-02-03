import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketFileUploadFileConfig } from './types';
/**
 * @slot - Used for drop zone content. Intended for an icon (optional), main text, and secondary text (optional).
 * @slot compact-action - Used for "compact" mode content. Intended for use with a `market-button` or `market-link`. When this
 * slot is used, default slot content must also be provided. Visible when `compact` is true.
 * @slot bottom-accessory - DEPRECATED: Used for the bottom accessory text. We recommend using the default slot
 * to add secondary text to the drop zone content instead.
 * @slot error - DEPRECATED: Used for input-level error text. We recommend using the fileMetadata prop to set error
 * status and messages on the file level instead.
 */
export declare class MarketFileUpload {
    el: HTMLMarketFileUploadElement;
    /**
     * String that is a list of file types the uploader should accept. This is
     * passed to the internal `<input type="file"/>` tag. For more info, see the
     * [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept).
     */
    readonly accept: string;
    /**
     * An array of File objects that can be passed in. (If using vanilla JS, this must be set using JS and not in the HTML markup.)
     */
    readonly value: Array<File>;
    /**
     * Functionally and visually disables the file picker.
     */
    readonly disabled: boolean;
    /**
     * DEPRECATED: Represents whether the input is invalid or not. This represents input-level error states.
     * We recommend using the fileMetadata prop to set error status and messages on the file level instead.
     */
    readonly invalid: boolean;
    /**
     * Represents whether the selector allows multiple files
     * to be selected.
     */
    readonly multiple: boolean;
    /**
     * Used to toggle "compact mode" (for use on mobile devices and when space is limited)
     */
    readonly compact: boolean;
    /**
     * What type of secondary information, if any, to display on all file rows
     */
    readonly fileSubtext?: 'size' | 'type';
    /**
     * What type of custom information, if any, to display on specified file rows.
     * Expects an array of TMarketFileUploadFileConfig objects (must be set using JS and not in the HTML markup), which
     * must include `filename` and can include an optional `status`, `message`, or `leadingIconName`.
     * Note that `message` is only shown when `status` is `'error'`, and `leadingIconName` expects the semantic or
     * descriptive name of an existing `market-icon`.
     */
    readonly fileMetadata?: Array<TMarketFileUploadFileConfig>;
    /**
     * Optional property passed to the delete icons on selected file
     * rows that will function as its aria-label. Defaults to "Delete".
     */
    readonly deleteButtonAriaLabel: string;
    /**
     * Tracks whether a file is being dragged over the component.
     */
    isDraggingOver: boolean;
    /**
     * Files that have been selected by the user either via drag & drop or
     * the file selector.
     */
    files: Array<File>;
    /**
     * Triggered when the selected files array changes.
     */
    marketFileUploadValueChange: EventEmitter<{
        value: Array<File>;
    }>;
    watchValueHandler(newValue: Array<File>): void;
    watchDisabledHandler(): void;
    /**
     * We want to disable certain functions if multiple is false and a file has been selected
     */
    get hasSingleFileSelected(): boolean;
    get slottedCompactButtons(): [HTMLMarketButtonElement | HTMLMarketLinkElement];
    private fileInputElement;
    draggingOver(e: any): void;
    endDrag(e: any): void;
    handleButtonClick(): void;
    handleDeleteKeydown(e: any, index: any): void;
    removeFile(index: number): void;
    labelContainerClassNames(): any[];
    onInputChange(e: any): void;
    addFiles(files: Array<File>): void;
    emitFileChange(): void;
    handleCompactSlotChange(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    renderFilesAsMarketRows(): any[];
    render(): any;
}
