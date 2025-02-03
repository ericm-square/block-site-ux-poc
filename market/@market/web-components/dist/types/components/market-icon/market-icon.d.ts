export declare class MarketIcon {
    el: HTMLMarketIconElement;
    /**
     * A string identifier for the icon. This can be either the semantic name which maps to
     * a token or the descriptive name, which maps to a SVG id in the sprite, though using the
     * semantic name is preferred because it gives you access to additional features like fidelity.
     * You can also pass any string and it will display a symbol or group within any SVG sprite
     * on the page, whether it is the Market sprite or not.
     */
    readonly name: string;
    /**
     * Optional: A number representing the fidelity of the icon to display.
     */
    readonly fidelity: number;
    /**
     * Whether or not the icon can change color (is monotone).
     * */
    tintable: boolean;
    width: number;
    height: number;
    cloneSymbol(symbol: any, assetName: any, width: any, height: any): void;
    getDimensions(symbol: any, fidelityToken: any, currentFidelity: any): {
        width: any;
        height: any;
    };
    componentWillLoad(): void;
    render(): any;
}
