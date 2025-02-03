'use strict';

// Formulas pulled from
// https://github.com/simonwep/pickr/blob/master/src/js/utils/color.js#L28
// Shorthands
const { min, max, floor, round } = Math;
function hsvToRgb(hArg, sArg, vArg) {
    let h = hArg;
    let s = sArg;
    let v = vArg;
    h = (h / 360) * 6;
    s /= 100;
    v /= 100;
    const i = floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;
    const r = [v, q, p, p, t, v][mod];
    const g = [t, v, v, q, p, p][mod];
    const b = [p, p, t, v, v, q][mod];
    return [r * 255, g * 255, b * 255];
}
/**
 * Convert HSV spectrum to Hex.
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns {string[]} Hex values
 */
function hsvToHex(h, s, v) {
    return hsvToRgb(h, s, v).map((v) => round(v).toString(16).padStart(2, '0'));
}
/**
 * Convert RGB to HSV.
 * @param r Red
 * @param g Green
 * @param b Blue
 * @return {number[]} HSV values.
 */
function rgbToHsv(rArg, gArg, bArg) {
    let r = rArg;
    let g = gArg;
    let b = bArg;
    r /= 255;
    g /= 255;
    b /= 255;
    const minVal = min(r, g, b);
    const maxVal = max(r, g, b);
    const delta = maxVal - minVal;
    let h, s;
    const v = maxVal;
    if (delta === 0) {
        h = s = 0;
    }
    else {
        s = delta / maxVal;
        const dr = ((maxVal - r) / 6 + delta / 2) / delta;
        const dg = ((maxVal - g) / 6 + delta / 2) / delta;
        const db = ((maxVal - b) / 6 + delta / 2) / delta;
        if (r === maxVal) {
            h = db - dg;
        }
        else if (g === maxVal) {
            h = 1 / 3 + dr - db;
        }
        else if (b === maxVal) {
            h = 2 / 3 + dg - dr;
        }
        if (h < 0) {
            h += 1;
        }
        else if (h > 1) {
            h -= 1;
        }
    }
    return [h * 360, s * 100, v * 100];
}
/**
 * Convert HSL to HSV.
 * @param h Hue
 * @param s Saturation
 * @param l Lightness
 * @return {number[]} HSV values.
 */
function hslToHsv(h, sArg, lArg) {
    let s = sArg;
    let l = lArg;
    s /= 100;
    l /= 100;
    s *= l < 0.5 ? l : 1 - l;
    const ns = ((2 * s) / (l + s)) * 100;
    const v = (l + s) * 100;
    return [h, Number.isNaN(ns) ? 0 : ns, v];
}
/**
 * Convert HEX to HSV.
 * @param hex Hexadecimal string of rgb colors, can have length 3 or 6.
 * @return {number[]} HSV values.
 */
function hexToHsv(hex) {
    const result = hex.match(/.{2}/g);
    const numResult = result.map((v) => Number.parseInt(v, 16));
    return rgbToHsv(numResult[0], numResult[1], numResult[2]);
}
/**
 * Takes an Array of any type, convert strings which represents
 * a number to a number and anything else to undefined.
 * @param array
 * @return {*}
 */
function numarize(array) {
    return array.map((v) => {
        const n = Number(v);
        return Number.isNaN(v) ? undefined : n;
    });
}
/**
 * Try's to parse a string which represents a color to a HSV array.
 * Current supported types are rgba, hsla and hexadecimal.
 * @param str
 * @return {*}
 */
/* eslint-disable complexity */
function parseToHSVA(str) {
    // Check if string is a color-name
    // str = str.match(/^[a-zA-Z]+$/) ? standardizeColor(str) : str;
    // Regular expressions to match different types of color represention
    const validColorValueRegex = {
        rgba: /^rgba?\D+([\d.]+)(%?)\D+([\d.]+)(%?)\D+([\d.]+)(%?)\D*?(([\d.]+)(%?)|$)/i,
        hsla: /^hsla?\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D*?(([\d.]+)(%?)|$)/i,
        hsva: /^hsva?\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D*?(([\d.]+)(%?)|$)/i,
        hexa: /^#?(([\da-f]{3,4})|([\da-f]{6})|([\da-f]{8}))$/i,
    };
    for (const [colorType, regex] of Object.entries(validColorValueRegex)) {
        const match = regex.exec(str);
        if (!match) {
            continue;
        }
        // Try to convert
        switch (colorType) {
            case 'rgba': {
                const numarizedResult = numarize(match);
                let r = numarizedResult[1];
                let g = numarizedResult[3];
                let b = numarizedResult[5];
                let a = numarizedResult[8];
                r = match[2] === '%' ? (r / 100) * 255 : r;
                g = match[4] === '%' ? (g / 100) * 255 : g;
                b = match[6] === '%' ? (b / 100) * 255 : b;
                a = match[9] === '%' ? a / 100 : a;
                if (r > 255 || g > 255 || b > 255 || a < 0 || a > 1) {
                    break;
                }
                return { values: [...rgbToHsv(r, g, b), a], a, colorType };
            }
            case 'hexa': {
                let [, hex] = match;
                if (hex.length === 4 || hex.length === 3) {
                    hex = hex
                        .split('')
                        .map((v) => v + v)
                        .join('');
                }
                const raw = hex.slice(0, 6);
                let a = hex.slice(6);
                // Convert 0 - 255 to 0 - 1 for opacity
                a = a ? Number.parseInt(a, 16) / 255 : undefined;
                return { values: [...hexToHsv(raw), a], a, colorType };
            }
            case 'hsla': {
                const numarizedResult = numarize(match);
                const h = numarizedResult[1];
                const s = numarizedResult[2];
                const l = numarizedResult[3];
                let a = numarizedResult[5];
                a = match[6] === '%' ? a / 100 : a;
                if (h > 360 || s > 100 || l > 100 || a < 0 || a > 1) {
                    break;
                }
                return { values: [...hslToHsv(h, s, l), a], a, colorType };
            }
            case 'hsva': {
                const numarizedResult = numarize(match);
                const h = numarizedResult[1];
                const s = numarizedResult[2];
                const v = numarizedResult[3];
                let a = numarizedResult[5];
                a = match[6] === '%' ? a / 100 : a;
                if (h > 360 || s > 100 || v > 100 || a < 0 || a > 1) {
                    break;
                }
                return { values: [h, s, v, a], a, colorType };
            }
        }
    }
    return { values: null, colorType: null };
}
/* eslint-enable complexity */

exports.hsvToHex = hsvToHex;
exports.hsvToRgb = hsvToRgb;
exports.parseToHSVA = parseToHSVA;

//# sourceMappingURL=color-06c5e63f.js.map