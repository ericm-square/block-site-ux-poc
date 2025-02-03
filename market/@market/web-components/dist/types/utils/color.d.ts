export declare function hsvToRgb(hArg: number, sArg: number, vArg: number): number[];
/**
 * Convert HSV spectrum to Hex.
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns {string[]} Hex values
 */
export declare function hsvToHex(h: number, s: number, v: number): string[];
/**
 * Takes an Array of any type, convert strings which represents
 * a number to a number and anything else to undefined.
 * @param array
 * @return {*}
 */
export declare function numarize(array: unknown[]): (number | undefined)[];
/**
 * Try's to parse a string which represents a color to a HSV array.
 * Current supported types are rgba, hsla and hexadecimal.
 * @param str
 * @return {*}
 */
export declare function parseToHSVA(str: string): {
    values: number[];
    a: number;
    colorType: "rgba";
} | {
    values: number[];
    a: number;
    colorType: "hexa";
} | {
    values: number[];
    a: number;
    colorType: "hsla";
} | {
    values: number[];
    a: number;
    colorType: "hsva";
} | {
    values: any;
    colorType: any;
    a?: undefined;
};
