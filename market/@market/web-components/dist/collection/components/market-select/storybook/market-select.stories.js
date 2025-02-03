import { html } from "lit";
import { MarketSelectTemplate } from "./market-select.templates";
import { SlottedAccessoryTypes } from "../../../../docs/helpers/slotted-accessory";
export default {
    title: 'Components/Select/API',
    component: 'market-select',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        itemCount: {
            control: { type: 'number' },
            description: 'The number of options in the select',
            name: 'Item count',
            table: { category: 'Demo' },
        },
        leadingAccessory: {
            name: 'Leading accessory',
            description: 'Slot in a leading accessory',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: SlottedAccessoryTypes,
        },
        label: {
            control: { type: 'text' },
            description: 'Slotted label text',
            name: 'Label',
            table: { category: 'Demo' },
        },
        trailingAccessory: {
            name: 'Trailing accessory',
            description: 'Slot in a trailing accessory',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: SlottedAccessoryTypes,
        },
        // props
        focused: { table: { disable: true } },
        value: { control: { type: 'text' } },
    },
    args: {
        itemCount: 5,
        label: 'Label',
    },
};
export const API = {
    render: (args) => MarketSelectTemplate(args),
};
// ------------------------------
// Large
// ------------------------------
export const Default = Object.assign({}, API);
export const Value = Object.assign(Object.assign({}, API), { args: { value: 'melon-2' } });
export const Placeholder = Object.assign(Object.assign({}, API), { args: { placeholder: 'Hint...' } });
export const Invalid = Object.assign(Object.assign({}, API), { args: { invalid: true } });
export const Disabled = Object.assign(Object.assign({}, API), { args: { disabled: true } });
export const Tooltip = Object.assign(Object.assign({}, API), { args: { trailingAccessory: 'tooltip' } });
export const Accessory = Object.assign(Object.assign({}, API), { args: { leadingAccessory: 'image' } });
export const DisabledRow = Object.assign(Object.assign({}, API), { args: { listArgs: { disabledItemsIndices: '2' } } });
export const ManyOptions = Object.assign(Object.assign({}, API), { args: { itemCount: 50 } });
export const LongOptions = Object.assign(Object.assign({}, API), { args: {
        value: 'mango-1',
        itemCount: 3,
        listArgs: {
            rowArgMap: {
                0: {
                    label: 'An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus.',
                },
                1: {
                    label: 'A mango is an edible stone fruit produced by the tropical tree Mangifera indica. It originated from the region between northwestern Myanmar, Bangladesh, and northeastern India.',
                },
                2: {
                    label: 'The pineapple (Ananas comosus) is a tropical plant with an edible fruit; it is the most economically significant plant in the family Bromeliaceae.',
                },
            },
        },
    } });
export const LongLabel = Object.assign(Object.assign({}, API), { args: {
        label: 'Fruits are the means by which flowering plants (also known as angiosperms) disseminate their seeds. Edible fruits in particular have long propagated using the movements of humans and animals in a symbiotic relationship that is the means for seed dispersal for the one group and nutrition for the other.',
    } });
export const AllSlots = Object.assign(Object.assign({}, API), { args: {
        itemCount: 3,
        listArgs: {
            hasSubtext: true,
            rowArgMap: {
                0: {
                    control: 'radio',
                    leadingAccessory: 'image',
                    trailingAccessory: 'icon',
                    sideLabel: 'Side',
                    sideSubtext: 'Side sec',
                },
                1: {
                    control: 'radio',
                    leadingAccessory: 'image',
                    trailingAccessory: 'icon',
                    sideLabel: 'Side',
                    sideSubtext: 'Side sec',
                },
                2: {
                    control: 'radio',
                    leadingAccessory: 'image',
                    trailingAccessory: 'icon',
                    sideLabel: 'Side',
                    sideSubtext: 'Side sec',
                },
            },
        },
    } });
export const Search = Object.assign(Object.assign({}, API), { args: { listArgs: { hasSearch: true } } });
export const Form = {
    render: (args) => {
        var _a;
        return html `
    <form class="market-grid-container" onsubmit="alert('You submitted the form!'); return false;">
      <div class="market-grid-item-small">${MarketSelectTemplate(args)}</div>
      <div class="market-grid-item-small">
        <market-button type="submit" rank="primary" size="${(_a = args.size) !== null && _a !== void 0 ? _a : 'large'}">Submit</market-button>
      </div>
    </form>
  `;
    },
};
// ------------------------------
// Large Multiselect
// ------------------------------
export const Multiselect = Object.assign(Object.assign({}, API), { args: { multiselect: true } });
export const MultiselectValue = Object.assign(Object.assign({}, API), { args: { multiselect: true, value: 'melon-2,strawberry-4' } });
export const MultiselectPlaceholder = Object.assign(Object.assign({}, API), { args: { multiselect: true, placeholder: 'Hint...' } });
export const MultiselectSelectAll = Object.assign(Object.assign({}, API), { args: { multiselect: true, listArgs: { hasSelectAll: true } } });
export const MultiselectSelectAllSearch = Object.assign(Object.assign({}, API), { args: {
        multiselect: true,
        listArgs: { hasSelectAll: true, hasSearch: true },
    } });
export const MultiselectTooltip = Object.assign(Object.assign({}, Tooltip), { args: Object.assign(Object.assign({}, Tooltip.args), { multiselect: true }) });
export const MultiselectDisabledRow = Object.assign(Object.assign({}, DisabledRow), { args: Object.assign(Object.assign({}, DisabledRow.args), { multiselect: true }) });
export const MultiselectLongOptions = Object.assign(Object.assign({}, LongOptions), { args: Object.assign(Object.assign({}, LongOptions.args), { multiselect: true }) });
export const MultiselectLongLabel = Object.assign(Object.assign({}, LongLabel), { args: Object.assign(Object.assign({}, LongLabel.args), { multiselect: true }) });
export const MultiselectAllSlots = Object.assign(Object.assign({}, AllSlots), { args: Object.assign(Object.assign({}, AllSlots.args), { multiselect: true }) });
export const MultiselectSelectedTranslation = Object.assign(Object.assign({}, MultiselectValue), { args: Object.assign(Object.assign({}, MultiselectValue.args), { selectedTranslation: 'fruits selected!' }) });
// ------------------------------
// Medium
// ------------------------------
export const MediumDefault = Object.assign(Object.assign({}, Default), { args: Object.assign(Object.assign({}, Default.args), { size: 'medium' }) });
export const MediumValue = Object.assign(Object.assign({}, Value), { args: Object.assign(Object.assign({}, Value.args), { size: 'medium' }) });
export const MediumPlaceholder = Object.assign(Object.assign({}, Placeholder), { args: Object.assign(Object.assign({}, Placeholder.args), { size: 'medium' }) });
export const MediumInvalid = Object.assign(Object.assign({}, Invalid), { args: Object.assign(Object.assign({}, Invalid.args), { size: 'medium' }) });
export const MediumDisabled = Object.assign(Object.assign({}, Disabled), { args: Object.assign(Object.assign({}, Disabled.args), { size: 'medium' }) });
export const MediumTooltip = Object.assign(Object.assign({}, Tooltip), { args: Object.assign(Object.assign({}, Tooltip.args), { size: 'medium' }) });
export const MediumDisabledRow = Object.assign(Object.assign({}, DisabledRow), { args: Object.assign(Object.assign({}, DisabledRow.args), { size: 'medium' }) });
export const MediumManyOptions = Object.assign(Object.assign({}, ManyOptions), { args: Object.assign(Object.assign({}, ManyOptions.args), { size: 'medium' }) });
export const MediumLongOptions = Object.assign(Object.assign({}, LongOptions), { args: Object.assign(Object.assign({}, LongOptions.args), { size: 'medium' }) });
export const MediumAllSlots = Object.assign(Object.assign({}, AllSlots), { args: Object.assign(Object.assign({}, AllSlots.args), { size: 'medium' }) });
export const MediumSearch = Object.assign(Object.assign({}, Search), { args: Object.assign(Object.assign({}, Search.args), { size: 'medium' }) });
export const MediumForm = Object.assign(Object.assign({}, Form), { args: Object.assign(Object.assign({}, Form.args), { size: 'medium' }) });
// ------------------------------
// Medium Multiselect
// ------------------------------
export const MediumMultiselect = Object.assign(Object.assign({}, Multiselect), { args: Object.assign(Object.assign({}, Multiselect.args), { size: 'medium' }) });
export const MediumMultiselectValue = Object.assign(Object.assign({}, MultiselectValue), { args: Object.assign(Object.assign({}, MultiselectValue.args), { size: 'medium' }) });
export const MediumMultiselectPlaceholder = Object.assign(Object.assign({}, MultiselectPlaceholder), { args: Object.assign(Object.assign({}, MultiselectPlaceholder.args), { size: 'medium' }) });
export const MediumMultiselectSelectAll = Object.assign(Object.assign({}, MultiselectSelectAll), { args: Object.assign(Object.assign({}, MultiselectSelectAll.args), { size: 'medium' }) });
export const MediumMultiselectSelectAllSearch = Object.assign(Object.assign({}, MultiselectSelectAllSearch), { args: Object.assign(Object.assign({}, MultiselectSelectAllSearch.args), { size: 'medium' }) });
export const MediumMultiselectTooltip = Object.assign(Object.assign({}, MultiselectTooltip), { args: Object.assign(Object.assign({}, MultiselectTooltip.args), { size: 'medium' }) });
export const MediumMultiselectDisabledRow = Object.assign(Object.assign({}, MultiselectDisabledRow), { args: Object.assign(Object.assign({}, MultiselectDisabledRow.args), { size: 'medium' }) });
export const MediumMultiselectLongOptions = Object.assign(Object.assign({}, MultiselectLongOptions), { args: Object.assign(Object.assign({}, MultiselectLongOptions.args), { size: 'medium' }) });
export const MediumMultiselectAllSlots = Object.assign(Object.assign({}, MultiselectAllSlots), { args: Object.assign(Object.assign({}, MultiselectAllSlots.args), { size: 'medium' }) });
export const MediumMultiselectSelectedTranslation = Object.assign(Object.assign({}, MultiselectSelectedTranslation), { args: Object.assign(Object.assign({}, MultiselectSelectedTranslation.args), { size: 'medium' }) });
// ------------------------------
// Small
// ------------------------------
export const SmallDefault = Object.assign(Object.assign({}, Default), { args: Object.assign(Object.assign({}, Default.args), { size: 'small' }) });
export const SmallValue = Object.assign(Object.assign({}, Value), { args: Object.assign(Object.assign({}, Value.args), { size: 'small' }) });
export const SmallPlaceholder = Object.assign(Object.assign({}, Placeholder), { args: Object.assign(Object.assign({}, Placeholder.args), { size: 'small' }) });
export const SmallInvalid = Object.assign(Object.assign({}, Invalid), { args: Object.assign(Object.assign({}, Invalid.args), { size: 'small' }) });
export const SmallDisabled = Object.assign(Object.assign({}, Disabled), { args: Object.assign(Object.assign({}, Disabled.args), { size: 'small' }) });
export const SmallTooltip = Object.assign(Object.assign({}, Tooltip), { args: Object.assign(Object.assign({}, Tooltip.args), { size: 'small' }) });
export const SmallDisabledRow = Object.assign(Object.assign({}, DisabledRow), { args: Object.assign(Object.assign({}, DisabledRow.args), { size: 'small' }) });
export const SmallManyOptions = Object.assign(Object.assign({}, ManyOptions), { args: Object.assign(Object.assign({}, ManyOptions.args), { size: 'small' }) });
export const SmallLongOptions = Object.assign(Object.assign({}, LongOptions), { args: Object.assign(Object.assign({}, LongOptions.args), { size: 'small' }) });
export const SmallAllSlots = Object.assign(Object.assign({}, AllSlots), { args: Object.assign(Object.assign({}, AllSlots.args), { size: 'small' }) });
export const SmallSearch = Object.assign(Object.assign({}, Search), { args: Object.assign(Object.assign({}, Search.args), { size: 'small' }) });
export const SmallForm = Object.assign(Object.assign({}, Form), { args: Object.assign(Object.assign({}, Form.args), { size: 'small' }) });
// ------------------------------
// Small Multiselect
// ------------------------------
export const SmallMultiselect = Object.assign(Object.assign({}, Multiselect), { args: Object.assign(Object.assign({}, Multiselect.args), { size: 'small' }) });
export const SmallMultiselectValue = Object.assign(Object.assign({}, MultiselectValue), { args: Object.assign(Object.assign({}, MultiselectValue.args), { size: 'small' }) });
export const SmallMultiselectPlaceholder = Object.assign(Object.assign({}, MultiselectPlaceholder), { args: Object.assign(Object.assign({}, MultiselectPlaceholder.args), { size: 'small' }) });
export const SmallMultiselectSelectAll = Object.assign(Object.assign({}, MultiselectSelectAll), { args: Object.assign(Object.assign({}, MultiselectSelectAll.args), { size: 'small' }) });
export const SmallMultiselectSelectAllSearch = Object.assign(Object.assign({}, MultiselectSelectAllSearch), { args: Object.assign(Object.assign({}, MultiselectSelectAllSearch.args), { size: 'small' }) });
export const SmallMultiselectTooltip = Object.assign(Object.assign({}, MultiselectTooltip), { args: Object.assign(Object.assign({}, MultiselectTooltip.args), { size: 'small' }) });
export const SmallMultiselectDisabledRow = Object.assign(Object.assign({}, MultiselectDisabledRow), { args: Object.assign(Object.assign({}, MultiselectDisabledRow.args), { size: 'small' }) });
export const SmallMultiselectLongOptions = Object.assign(Object.assign({}, MultiselectLongOptions), { args: Object.assign(Object.assign({}, MultiselectLongOptions.args), { size: 'small' }) });
export const SmallMultiselectAllSlots = Object.assign(Object.assign({}, MultiselectAllSlots), { args: Object.assign(Object.assign({}, MultiselectAllSlots.args), { size: 'small' }) });
export const SmallMultiselectSelectedTranslation = Object.assign(Object.assign({}, MultiselectSelectedTranslation), { args: Object.assign(Object.assign({}, MultiselectSelectedTranslation.args), { size: 'small' }) });
//# sourceMappingURL=market-select.stories.js.map
