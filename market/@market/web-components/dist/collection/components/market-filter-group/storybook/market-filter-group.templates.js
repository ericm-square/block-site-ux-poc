import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { FilterDateTemplate, FilterListTemplate, } from "../../market-filter/storybook/market-filter.templates";
const ColorFilter = (props) => FilterListTemplate(Object.assign({ name: 'color', labelText: 'Color', listRowArgMap: {
        0: {
            label: html `Classic blue &#129429;`,
            value: 'classic-blue',
        },
        1: {
            label: html `Illuminating &#127804;`,
            value: 'illuminating',
        },
        2: {
            label: html `Living coral &#127825;`,
            value: 'living-coral',
        },
        3: {
            label: html `Ultra violet &#128126;`,
            value: 'ultra-violet',
        },
        4: {
            label: html `Very Peri &#129412;`,
            value: 'very-peri',
        },
    } }, props));
const PriceFilter = (props) => FilterListTemplate(Object.assign({ name: 'price', labelText: 'Price', listRowArgMap: {
        0: { label: 'No preference' },
        1: {
            label: '$',
            value: '1',
        },
        2: {
            label: '$$',
            value: '2',
        },
        3: {
            label: '$$$',
            value: '3',
        },
        4: {
            label: '$$$$',
            value: '4',
        },
    } }, props));
const DateFilter = (props) => FilterDateTemplate(Object.assign({ name: 'date', labelText: 'Date', displayMenu: true, displayedDate: '1/1/2023', selectedStartDate: '1/16/2023', selectedEndDate: '1/29/2023', selectionType: 'range' }, props));
const ShapeFilter = (props) => FilterListTemplate(Object.assign({ name: 'shape', labelText: 'Shape', listMultiselect: true, listValue: 'square', listRowArgMap: {
        0: {
            control: 'checkbox',
            label: 'Circle',
            value: 'circle',
        },
        1: {
            control: 'checkbox',
            label: 'Hexagon',
            value: 'hexagon',
        },
        2: {
            control: 'checkbox',
            label: 'Pentagon',
            value: 'pentagon',
        },
        3: {
            control: 'checkbox',
            label: 'Rectangle',
            value: 'rectangle',
        },
        4: {
            control: 'checkbox',
            label: 'Square',
            value: 'square',
        },
        5: {
            control: 'checkbox',
            label: 'Star',
            value: 'star',
        },
        6: {
            control: 'checkbox',
            label: 'Triangle',
            value: 'triangle',
        },
    } }, props));
export const DefaultTemplate = ({ hasSearch, maxVisibleFilters, size }) => html `
  <market-filter-group max-visible-filters=${ifDefined(maxVisibleFilters)}>
    ${hasSearch ? html ` <market-input-search slot="search" variant=${ifDefined(size)}></market-input-search>` : ''}
    ${ColorFilter({ size })} ${PriceFilter({ size })} ${DateFilter({ size })} ${ShapeFilter({ size })}
  </market-filter-group>
`;
//# sourceMappingURL=market-filter-group.templates.js.map
