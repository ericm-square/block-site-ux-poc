export declare class MarketQrcode {
    /**
     * The URL or other content of the QR code. The QR code is generated using
     * [@square/qrcode-encoder](https://github.com/squareup/qrcode/blob/master/packages/square-qrcode-encoder/README.md).
     */
    readonly content: string;
    /**
     * By default, QR code size is dependent on the information being encoded.
     * Use this property to set the QR code's height and width in pixels.
     */
    readonly size: number;
    /**
     * Include a six data-pixel border around the QR code. When this attribute is
     * present, the QR code will have a background color (default is transparent
     * background).
     */
    readonly border: boolean;
    /**
     * When true, QR code will render all elements in black & white.
     */
    readonly monochrome: boolean;
    render(): any;
}
