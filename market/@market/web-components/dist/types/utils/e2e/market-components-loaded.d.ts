/**
 * Returns a promise which does not resolve until all Market components in the
 * root element have loaded. Use before running your React tests to make sure
 * Market elements are ready to be interacted with.
 * Takes an Element as a param, which should represent a root node which holds all the Market components you need to test.
 * You can grab this by getting the baseElement property from the render results used with @testing-library/react.
 *
 * Adapted from prior art here:
 * https://github.com/ionic-team/stencil/blob/45388e95edb46ef357eb9ae37cd32bbb5bc1ed23/test/karma/test-app/util.ts#L88-L106
 *
 * @param {Element} domNode
 * @returns {Promise<void>}
 */
declare const marketComponentsLoaded: (elm: Element) => Promise<void>;
export default marketComponentsLoaded;
