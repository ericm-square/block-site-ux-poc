// This function sets CSS styles on an element and returns a promise.
// The promise is resolved after any CSS transitions complete on the changed styles.
// It's smart enough to resolve immediately if there is no transition on the style.
// However, this is intended to be used with transitions that are set in CSS files.
//
// Example usage:
// await transitionToPromise(element, {
//   top: '100px',
//   height: '100px',
//   transform: 'scale(2)',
// });
//
// adapted from https://gist.github.com/davej/44e3bbec414ed4665220
export async function transitionToPromise(el, styles) {
    const computedStyle = getComputedStyle(el);
    const { transitionProperty } = computedStyle;
    const properties = transitionProperty.split(', ');
    return Promise.all(Object.keys(styles).map((property) => {
        const value = styles[property];
        return new Promise((resolve) => {
            // if no value to set, resolve
            if (!value)
                resolve();
            // if same value, resolve
            if (value === el.style[property])
                resolve();
            // if no transition on this property, set it and resolve
            if (!properties.includes(property)) {
                el.style[property] = value;
                resolve();
            }
            // otherwise, set up a listener for transitionend
            const transitionEnded = (e) => {
                if (e.propertyName !== property)
                    return;
                el.removeEventListener('transitionend', transitionEnded);
                resolve();
            };
            el.addEventListener('transitionend', transitionEnded);
            el.style[property] = value;
        });
    }));
}
//# sourceMappingURL=transition-to-promise.js.map
