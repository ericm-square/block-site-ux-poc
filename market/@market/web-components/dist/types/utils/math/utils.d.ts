import { Vec2 } from './types';
type CompressOptions = {
    threshold?: number;
    linearRatio?: number;
    quadraticRatio?: number;
    invert?: boolean;
};
/**
 * Compress a given input value as it exceeds a given threshhold.
 * Both quadratic and linear compression is supported.
 * the output grows by an increasingly diminishing amount.
 * @param {number} input - The value to be compressed.
 * @param {CompressOptions} options - Override defaults for the compression.
 * @param {number} options.threshhold - The value where compression starts. Input values that exceed the threshhold will be compressed. Default of 0.
 * @param {number} options.linearRatio - (0-1) The ratio to which the input exceeding the threshhold will be reduced. 0.33 creates a ~3-to-1 compression. Default of 1 (no compression).
 * @param {number} options.quadraticRatio - (0-1) The ratio of quadratic compression to which the input exceeding the threshhold will be reduced. 0.33 creates a ~cube-root compression. Default of 1 (no compression).
 * @param {boolean} options.invert - If true, the compression instead comrpesses values below the threshhold.
 */
export declare function compress(input: number, options?: CompressOptions): number;
type LimitOptions = {
    threshold?: number;
    maximum?: number;
    invert?: boolean;
};
/**
 * Limit a given input value as it exceeds a threshhold to stay below given maximum.
 * @param {number} input - The value to be limited.
 */
export declare function limit(input: number, options?: LimitOptions): number;
export declare function lerp(a: number, b: number, alpha: number): number;
export declare function lerp2(a: Vec2, b: Vec2, alpha: number): {
    x: number;
    y: number;
};
export declare function getDelta(startCoords: Vec2, endCoords: Vec2): Vec2;
export declare function magnitude(delta: Vec2): number;
export {};
