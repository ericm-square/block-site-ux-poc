/**
 * Parses a CSS grid-template-columns declaration and attempts to return an array with one entry for each column.
 *
 * @param {string} cssPropertyValue - Value of the `grid-template-columns` property.
 *
 * Example inputs and outputs:
 * '100px 80px 50px' --> ['100px', '80px', '50px']
 * '100px repeat(2, 80px)' --> ['100px', '80px', '80px']
 * '100px repeat(3, 50px, 75px)' --> ['100px', '50px', '75px', '50px']
 * 'repeat(2, 80px) repeat(3, 50px, 75px) 100px' --> ['80px', '80px', '50px', '75px', '50px', '100px']
 *
 * Why do we need this?
 * `market-table` has a `styleDeclaration` watcher which checks the CSS styles applied to the table. this gets used to
 * determine the grid template definition for the table (`this.gridColumnTemplate`), which in turn is used to set column
 * widths and update the grid layout. however, in situations where `grid-template-columns` is defined using the
 * `repeat()` function, we need to parse the value to ensure that we have a width explicitly specified for each column.
 * this ensures consistent column sizing and behavior when columns are being stuck/unstuck to the left/right.
 *
 * Cases where this will break:
 * 1. If user is using <auto-repeat> values ("auto-fill", "auto-fit") instead of explicit widths
 * 2. If user is using a CSS function other than `repeat()` (ex. `minmax()`, `fit-content()`)
 * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
 * https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
 */
export const parsedGridTemplateColumnValues = (cssPropertyValue) => {
    const array = cssPropertyValue.split(' '); // ex. '100px repeat(2, 80px)' --> ['100px', 'repeat(2', '80px)']
    // error handling for unsupported cases
    const unsupportedValues = ['auto-fill', 'auto-fit', 'minmax', 'fit-content'];
    const matches = unsupportedValues.filter((value) => cssPropertyValue.includes(value));
    const unsupportedValuesText = `${matches.length > 0 ? 'features' : 'feature'} ${matches
        .map((match) => `\`${match}\``)
        .join(', ')}`;
    if (matches.length > 0) {
        // eslint-disable-next-line no-console
        console.warn(`<market-table>'s grid layout is not built to support the use of the CSS ${unsupportedValuesText}.
To avoid potential column layout issues, try using explicitly defined \`grid-template-column\` widths using length, percentage, or flex units.`);
        // while this seems wonky (will return an array like ['repeat(auto-fill,', '250px)']), it means that table rows will
        // inherit the parent table's `grid-template-columns` declaration and will look as intended except for in situations
        // where columns are being stuck/unstuck.
        return array;
    }
    const output = [];
    let i = 0;
    let repeatedColCount = null;
    for (i = 0; i < array.length; i++) {
        const item = array[i];
        // check to see if we are at the start of a `repeat` block
        if (item.includes('repeat(')) {
            // get number of repeats, ex. "repeat(4" --> 4)
            repeatedColCount = Number.parseInt(item.match(/\d+/).toString(), 10);
            // figure out what's being repeated
            // look ahead from current index to the next index containing ")" (the end of the repeat block)
            const endOfRepeatFunctionIndex = array.findIndex((item, index) => index > i && item.includes(')'));
            // slice grid-template-columns values into their own array and strip parens/commas
            const repeatedValues = array.slice(i + 1, endOfRepeatFunctionIndex + 1).map((item) => item.replace(/\W/, ''));
            // push as many values from the set of repeating column sizes as are needed
            for (let j = 0; j < repeatedColCount; j++) {
                output.push(repeatedValues[j % repeatedValues.length].toString());
            }
            // reset repeatedColCount bc we're done w/ the repeat block
            repeatedColCount = null;
            // increment for loop to skip all the items we just dealt with
            i += repeatedValues.length;
        }
        else if (!repeatedColCount) {
            // if not in a `repeat()` block, save value as normal
            output.push(item);
        }
    }
    return output;
};
//# sourceMappingURL=utils.js.map
