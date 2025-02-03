/**
 * helper functions for managing callback timing (ex. delay, throttle, debounce)
 *
 * these will probably be most useful in situations where we wish to respond to
 * user input events (particularly ones that happen in "streams" like scrolling,
 * window resizing, or typing) in a performant way.
 *
 * if this file ends up larger than a few functions, we should consider bringing
 * in lodash as a dependency instead: https://lodash.com/docs
 *
 * recommended pattern for using these functions in your stencil components:
 * myEventHandler = debounce(() => {
 *   // your code
 * }, timeout)
 */
/**
 * returns a function that will not be triggered until it stops being called for
 * N milliseconds, adapted from https://davidwalsh.name/javascript-debounce-function
 *
 * @param callback - callback to be executed after the wait
 * @param {number} wait - wait in milliseconds
 */
export const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            callback.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
//# sourceMappingURL=callbacks.js.map
