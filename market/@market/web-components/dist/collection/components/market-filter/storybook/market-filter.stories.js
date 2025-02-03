import { html } from "lit";
import { FilterDateTemplate, FilterListTemplate } from "./market-filter.templates";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
import { fixFilterZIndex } from "./utils";
const DEFAULT_ITEMS = Object.freeze({
    0: {
        label: html `Classic blue &#129429;`,
        value: 'classic-blue',
        control: 'checkbox',
    },
    1: {
        label: html `Illuminating &#127804;`,
        value: 'illuminating',
        control: 'checkbox',
    },
    2: {
        label: html `Living coral &#127825;`,
        value: 'living-coral',
        control: 'checkbox',
    },
    3: {
        label: html `Ultra violet &#128126;`,
        value: 'ultra-violet',
        control: 'checkbox',
    },
    4: {
        label: html `Very Peri &#129412;`,
        value: 'very-peri',
        control: 'checkbox',
    },
});
const DEFAULT_ITEMS_WITH_NONE = Object.freeze({
    0: { label: 'None' },
    1: {
        label: html `Classic blue &#129429;`,
        value: 'classic-blue',
    },
    2: {
        label: html `Illuminating &#127804;`,
        value: 'illuminating',
    },
    3: {
        label: html `Living coral &#127825;`,
        value: 'living-coral',
    },
    4: {
        label: html `Ultra violet &#128126;`,
        value: 'ultra-violet',
    },
    5: {
        label: html `Very Peri &#129412;`,
        value: 'very-peri',
    },
});
export default {
    title: 'Components/Filter (BETA)/API',
    tags: ['autodocs', '!dev'],
    component: 'market-filter',
    argTypes: {
        filterType: {
            control: { type: 'select' },
            options: ['list', 'date'],
            description: 'Whether a `market-list` or `market-date-picker` is used by the filter displayed on the demo canvas.',
            name: 'Filter type',
            table: { category: 'Demo' },
        },
        labelText: {
            control: { type: 'text' },
            description: 'Passed to `<label slot="label">`',
            name: 'Label',
            table: { category: 'Demo' },
        },
        displayValueText: {
            control: { type: 'text' },
            description: 'Passed to `<span slot="display-value">`',
            name: 'Display value',
            table: { category: 'Demo' },
        },
        displayedDate: {
            control: { type: 'date' },
            description: 'Passed to `<market-date-picker displayed-date>`',
            name: 'Displayed date',
            table: { category: 'Demo' },
        },
        selectedStartDate: {
            control: { type: 'date' },
            description: 'Passed to `<market-date-picker selected-start-date>`',
            name: 'Start date',
            table: { category: 'Demo' },
        },
        selectedEndDate: {
            control: { type: 'date' },
            description: 'Passed to `<market-date-picker selected-end-date>`',
            name: 'End date',
            table: { category: 'Demo' },
        },
        selectionType: {
            control: { type: 'select' },
            options: ['single', 'range'],
            description: 'Passed to `<market-date-picker selection-type>`',
            name: 'Date selection type',
            table: { category: 'Demo' },
        },
        listRowArgMap: {
            content: { disable: true },
            table: { disable: true },
        },
    },
    args: {
        filterType: 'list',
        name: 'color',
        labelText: 'Color',
        listRowArgMap: DEFAULT_ITEMS_WITH_NONE,
    },
    parameters: {
        docs: {
            story: {
                autoplay: true,
            },
        },
    },
};
export const API = {
    render: (args) => {
        if (args.filterType === 'list') {
            return FilterListTemplate(args);
        }
        else if (args.filterType === 'date') {
            return FilterDateTemplate(args);
        }
        return '';
    },
    play: async ({ canvasElement }) => {
        await waitForMarketHydration(canvasElement);
        fixFilterZIndex(canvasElement);
    },
};
export const Small = Object.assign(Object.assign({}, API), { args: {
        size: 'small',
        listRowArgMap: (() => {
            const items = Object.assign({}, DEFAULT_ITEMS);
            Object.keys(items).forEach((index) => {
                items[index] = Object.assign(Object.assign({}, items[index]), { size: 'small' });
            });
            return items;
        })(),
    } });
export const Multiselect = Object.assign(Object.assign({}, API), { args: {
        listRowArgMap: DEFAULT_ITEMS,
        listMultiselect: true,
    } });
export const Date = Object.assign(Object.assign({}, API), { args: {
        filterType: 'date',
        labelText: 'Date',
        displayedDate: '2/1/2023',
        selectedStartDate: '1/15/23',
        selectedEndDate: '2/15/2023',
        selectionType: 'range',
    } });
//# sourceMappingURL=market-filter.stories.js.map
