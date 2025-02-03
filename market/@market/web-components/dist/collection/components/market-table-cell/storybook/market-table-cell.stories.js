import { html } from "lit";
import { MarketTableCellTemplate } from "./market-table-cell.templates";
import { SlottedAccessoryTypes } from "../../../../docs/helpers/slotted-accessory";
export default {
    title: 'Components/Table/v1/Cell/API',
    component: 'market-table-cell',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        content: {
            table: { category: 'Demo' },
            name: 'Text content',
            description: 'The cell text content rendered.',
            control: { type: 'text' },
        },
        leadingAccessory: {
            table: { category: 'Demo' },
            name: 'Leading accessory',
            description: 'Slot a leading accessory into the cell.',
            control: { type: 'select' },
            options: SlottedAccessoryTypes,
        },
        trailingAccessory: {
            table: { category: 'Demo' },
            name: 'Trailing accessory',
            description: 'Slot a trailing accessory into the cell.',
            control: { type: 'select' },
            options: SlottedAccessoryTypes,
        },
        formField: {
            table: { category: 'Demo' },
            name: 'Form field',
            description: 'Slot a form field into the cell.',
            control: { type: 'select' },
            options: ['none', 'input', 'select', 'password'],
        },
    },
    args: {
        content: 'Cell content',
    },
};
export const API = {
    render: (args) => MarketTableCellTemplate(args),
};
export const BasicExample = {
    render: () => html `
    <market-table>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const InheritProperties = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column name="one">Column 1</market-table-column>
        <market-table-column name="two">Column 2</market-table-column>
        <market-table-column name="three" align="right">Column 3</market-table-column>
      </market-table-row>
      <market-table-row leading-indentation="1">
        <market-table-cell>Inherits "leading-indentation" from row</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Has "align" and "column" set based on properties of corresponding column</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const LeadingAccessory = {
    render: () => html `
    <market-table>
      <market-table-row>
        ${MarketTableCellTemplate({ content: 'Cell with icon accessory', leadingAccessory: 'icon' })}
        ${MarketTableCellTemplate({ content: 'Cell with image accessory', leadingAccessory: 'image' })}
        ${MarketTableCellTemplate({ content: 'Cell with tooltip', leadingAccessory: 'tooltip' })}
      </market-table-row>
    </market-table>
  `,
};
export const TrailingAccessory = {
    render: () => html `
    <market-table>
      <market-table-row>
        ${MarketTableCellTemplate({ content: 'Cell with icon accessory', trailingAccessory: 'icon' })}
        ${MarketTableCellTemplate({ content: 'Cell with image accessory', trailingAccessory: 'image' })}
        ${MarketTableCellTemplate({ content: 'Cell with tooltip', trailingAccessory: 'tooltip' })}
      </market-table-row>
    </market-table>
  `,
};
export const SlottedInputs = {
    render: () => html `
    <market-table>
      <market-table-row>
        ${MarketTableCellTemplate({ formField: 'input', formFieldPlaceholder: 'Text input' })}
        ${MarketTableCellTemplate({ formField: 'input', formFieldPlaceholder: 'Text input', leadingAccessory: 'icon' })}
        ${MarketTableCellTemplate({
        formField: 'input',
        formFieldPlaceholder: 'Text input',
        trailingAccessory: 'icon',
    })}
      </market-table-row>
      <market-table-row>
        ${MarketTableCellTemplate({ formField: 'select', formFieldPlaceholder: 'Select' })}
        ${MarketTableCellTemplate({
        formField: 'select',
        formFieldPlaceholder: 'Select',
        leadingAccessory: 'icon',
    })}
        ${MarketTableCellTemplate({
        formField: 'select',
        formFieldPlaceholder: 'Select',
        trailingAccessory: 'icon',
    })}
      </market-table-row>
    </market-table>
  `,
};
export const Interactive = {
    render: () => html `
    <market-table>
      <market-table-row>
        ${MarketTableCellTemplate({ content: 'Interactive cell', interactive: true })}
        ${MarketTableCellTemplate({
        content: 'Active cell',
        active: true,
    })}
        ${MarketTableCellTemplate({
        content: 'Disabled cell',
        disabled: true,
    })}
      </market-table-row>
    </market-table>
  `,
};
//# sourceMappingURL=market-table-cell.stories.js.map
