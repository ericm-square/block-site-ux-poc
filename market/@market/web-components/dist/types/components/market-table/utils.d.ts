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
export declare const parsedGridTemplateColumnValues: (cssPropertyValue: string) => string[];
