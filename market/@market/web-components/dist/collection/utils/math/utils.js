const compressDefaults = { threshold: 0, linearRatio: 1, quadraticRatio: 1, invert: false };
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
export function compress(input, options = {}) {
    const { quadraticRatio, linearRatio, threshold, invert } = Object.assign({}, compressDefaults, options);
    const inverter = invert ? -1 : 1;
    if (input * inverter < threshold * inverter) {
        return input;
    }
    const inputDelta = (input - threshold) * inverter;
    // note we offset by 1 to avoid values 0-1 being adjusted in the opposite direction when exponentialized.
    // this means that a provided quadratic ration of 0.5 does not result in a perfect square root.
    let outputDelta = (inputDelta + 1) ** quadraticRatio - 1;
    outputDelta = outputDelta * linearRatio;
    return threshold + outputDelta * inverter;
}
const limitDefaults = { threshold: 0, maximum: 1, invert: false };
/**
 * Limit a given input value as it exceeds a threshhold to stay below given maximum.
 * @param {number} input - The value to be limited.
 */
export function limit(input, options = {}) {
    const { threshold, maximum, invert } = Object.assign({}, limitDefaults, options);
    const inverter = invert ? -1 : 1;
    if (input * inverter < threshold * inverter) {
        return input;
    }
    const inputDelta = (input - threshold) * inverter;
    const maxDelta = (maximum - threshold) * inverter;
    const outputDelta = (inputDelta * maxDelta) / (inputDelta + maxDelta);
    return threshold + outputDelta * inverter;
}
export function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}
export function lerp2(a, b, alpha) {
    return {
        x: lerp(a.x, b.x, alpha),
        y: lerp(a.y, b.y, alpha),
    };
}
export function getDelta(startCoords, endCoords) {
    return {
        x: endCoords.x - startCoords.x,
        y: endCoords.y - startCoords.y,
    };
}
export function magnitude(delta) {
    return (delta.x ** 2 + delta.y ** 2) ** 0.5;
}
//# sourceMappingURL=utils.js.map
