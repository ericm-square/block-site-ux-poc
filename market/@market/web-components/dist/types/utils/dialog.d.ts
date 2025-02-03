export declare const ALL_DIALOG_TYPES: readonly ["modal-full", "modal-partial", "blade", "dialog", "sheet"];
export declare const DIALOGS_META: {
    'modal-full': {
        veil: boolean;
    };
    'modal-partial': {
        veil: boolean;
    };
    blade: {
        veil: boolean;
    };
    dialog: {
        veil: boolean;
    };
    sheet: {
        veil: boolean;
    };
};
export declare const getDialogSelector: () => string;
export type DialogType = typeof ALL_DIALOG_TYPES[number];
export type DialogElement = HTMLMarketDialogElement | HTMLMarketBladeElement | HTMLMarketModalFullElement | HTMLMarketModalPartialElement | HTMLMarketSheetElement;
export interface Dialog {
    el: DialogElement;
    type: DialogType;
    id: string;
    dialogID: string;
    index: number;
    indexOfType: number;
}
export interface DialogDismissedEvent {
    dialog: DialogElement;
    type: DialogType;
    origin: HTMLElement;
}
export interface DialogLoadedEvent {
    dialog: DialogElement;
    type: DialogType;
}
export declare function setupDialogCompactHandler(modal: any): void;
