export declare class MarketToaster {
    el: HTMLMarketToasterElement;
    toasts: Array<HTMLMarketToastElement>;
    /**
     * Add the passed toastEl to market-toaster and make it visible
     **/
    show(toastEl: any): Promise<void>;
    positionToasts(): void;
    /**
     * Remove the passed toastEl from market-toaster
     **/
    hide(toastEl: any): Promise<void>;
    /**
     * Remove all market-toasts from market-toaster
     **/
    removeAll(): Promise<void[]>;
    toastAutoDismissedEventHandler({ target: toast }: {
        target: any;
    }): void;
    toastManuallyDismissedEventHandler({ target: toast }: {
        target: any;
    }): void;
    render(): any;
}
