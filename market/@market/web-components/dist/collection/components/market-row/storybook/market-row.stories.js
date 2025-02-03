import { html } from "lit";
import { SlottedAccessoryTypes } from "../../../../docs/helpers/slotted-accessory";
import { SlottedControlTypes } from "../../../../docs/helpers/slotted-control";
import { MarketRowTemplate, MarketRowExamplesTemplate, MarketRowInteractiveExamplesTemplate, } from "./market-row.templates";
export default {
    title: 'Components/Row/API',
    component: 'market-row',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set markup controls
        label: {
            name: 'Label',
            description: 'Slot in a label element',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        subtext: {
            name: 'Subtext',
            description: 'Slot in a subtext element',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        sideLabel: {
            name: 'Side label',
            description: 'Slot in a side label element',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        sideSubtext: {
            name: 'Side subtext',
            description: 'Slot in a side subtext element',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        control: {
            name: 'Control',
            description: 'Slot in a control element',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: SlottedControlTypes,
        },
        leadingAccessory: {
            name: 'Leading accessory',
            description: 'Slot in a leading accessory',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: SlottedAccessoryTypes,
        },
        trailingAccessory: {
            name: 'Trailing accessory',
            description: 'Slot in a trailing accessory',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: SlottedAccessoryTypes,
        },
    },
    args: {
        label: 'Row',
        subtext: '',
        sideLabel: '',
        sideSubtext: '',
    },
};
export const API = {
    render: (args) => MarketRowTemplate(args),
};
export const Examples = {
    render: (args) => MarketRowExamplesTemplate(args),
};
export const InteractiveExamples = {
    render: (args) => MarketRowInteractiveExamplesTemplate(args),
};
// ------------------------------
// Medium Rows
// ------------------------------
export const MediumExamples = Object.assign({}, Examples);
export const MediumInteractiveExamples = Object.assign({}, InteractiveExamples);
export const MediumDestructiveExamples = Object.assign(Object.assign({}, Examples), { args: { destructive: true } });
export const MediumDestructiveInteractiveExamples = Object.assign(Object.assign({}, InteractiveExamples), { args: { destructive: true } });
// ------------------------------
// Small Rows
// ------------------------------
export const SmallExamples = Object.assign(Object.assign({}, Examples), { args: { size: 'small' } });
export const SmallInteractiveExamples = Object.assign(Object.assign({}, InteractiveExamples), { args: { size: 'small' } });
export const SmallDestructiveExamples = Object.assign(Object.assign({}, Examples), { args: { size: 'small', destructive: true } });
export const SmallDestructiveInteractiveExamples = Object.assign(Object.assign({}, InteractiveExamples), { args: { size: 'small', destructive: true } });
// ------------------------------
// Guide
// ------------------------------
export const WrappingBehavior = {
    render: () => html `
    <market-row interactive>
      <label slot="label">
        This label is long and will wrap on smaller screens, which is good since you can read it.
      </label>
      <p slot="subtext">Secondary text is also long and will wrap on smaller screens, and that's cool too.</p>
    </market-row>
    <style>
      market-row {
        /* giving the row a narrow width so it'll wrap, no need to copy this */
        width: 400px;
      }
    </style>
  `,
};
export const TruncationBehavior = {
    render: () => html `
    <market-row interactive class="my-market-row">
      <label class="my-label" slot="label">
        This label is long and will wrap on smaller screens, but the extra text is not super important so it's OK to
        truncate.
      </label>
      <p class="my-subtext" slot="subtext">
        Secondary text is also long and will wrap on smaller screens, but the extra text is not super important so it's
        OK to truncate.
      </p>
    </market-row>
    <style>
      market-row {
        /* giving the row a narrow width so it'll wrap, no need to copy this */
        width: 400px;
      }
      .my-label,
      .my-subtext {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    </style>
  `,
};
//# sourceMappingURL=market-row.stories.js.map
