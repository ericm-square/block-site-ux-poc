import { html } from "lit";
import { MarketTableV2CellTemplate } from "../subcomponents/market-table-v2-cell/storybook/market-table-v2-cell.templates";
import { MarketTableV2RowTemplate } from "../subcomponents/market-table-v2-row/storybook/market-table-v2-row.templates";
export default {
    title: 'Components/Table/v2/Guide/2. Interactivity',
    tags: ['!dev'],
};
export const InteractiveCells = {
    render: () => html `
    <market-table-v2>
      ${Array.from({ length: 3 }, () => html `<market-table-v2-row>
            ${MarketTableV2CellTemplate({
        content: 'Interactive cell',
        interactive: true,
    })}
            ${MarketTableV2CellTemplate({
        content: 'Active cell',
        interactive: true,
        active: true,
    })}
            ${MarketTableV2CellTemplate({
        content: 'Disabled cell',
        interactive: true,
        disabled: true,
    })}
          </market-table-v2-row>`)}
    </market-table-v2>
  `,
};
export const InteractiveRows = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        content: 'This,is,an,interactive,row',
        interactive: true,
    })}
      ${MarketTableV2RowTemplate({
        content: 'This,is,an,active,row',
        interactive: true,
        active: true,
    })}
      ${MarketTableV2RowTemplate({
        content: 'This,is,a,disabled,row',
        interactive: true,
        disabled: true,
    })}
    </market-table-v2>
  `,
};
export const StickyRows = {
    render: () => html `
    <market-table-v2 id="sticky-rows-example">
      ${MarketTableV2RowTemplate({
        content: 'This,is,a,sticky,header',
        sticky: 'top',
        header: true,
    })}
      ${Array.from({ length: 18 }, () => MarketTableV2RowTemplate({ content: 'This,is,a,normal,row' }))}
      ${MarketTableV2RowTemplate({
        content: 'This,is,a,sticky,footer',
        sticky: 'bottom',
        footer: true,
    })}
    </market-table-v2>
    <style>
      #sticky-rows-example {
        height: 240px;
      }
    </style>
  `,
};
export const StickyColumns = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'This').join(','),
        stickyLeft: true,
        stickyRight: true,
    })}
      ${MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'is').join(','),
        stickyLeft: true,
        stickyRight: true,
    })}
      ${MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'a').join(','),
        stickyLeft: true,
        stickyRight: true,
    })}
      ${MarketTableV2RowTemplate({
        content: `sticky,${Array.from({ length: 18 }, () => 'normal').join(',')},sticky`,
        stickyLeft: true,
        stickyRight: true,
    })}
      ${MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'column').join(','),
        stickyLeft: true,
        stickyRight: true,
    })}
    </market-table-v2>
  `,
};
export const StickyBoth = {
    render: () => html `
    <market-table-v2 id="why-not-both-example" align="center">
      ${MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'Scroll!').join(','),
        header: true,
        stickyLeft: true,
        stickyRight: true,
        sticky: 'top',
    })}
      ${MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'Scroll!').join(','),
        stickyLeft: true,
        stickyRight: true,
    })}
      ${Array.from({ length: 18 }, () => MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'Scroll!').join(','),
        stickyLeft: true,
        stickyRight: true,
    }))}
      ${MarketTableV2RowTemplate({
        content: Array.from({ length: 20 }, () => 'Scroll!').join(','),
        footer: true,
        stickyLeft: true,
        stickyRight: true,
        sticky: 'bottom',
    })}
    </market-table-v2>
    <style>
      #why-not-both-example {
        height: 240px;
      }
    </style>
  `,
};
export const Accessories = {
    render: () => html `
    <market-table-v2 align="center">
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Text',
        leadingAccessory: 'text',
        trailingAccessory: 'text',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Text',
        leadingAccessory: 'text',
        trailingAccessory: 'text',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Text',
        leadingAccessory: 'text',
        trailingAccessory: 'text',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Tooltip',
        leadingAccessory: 'tooltip',
        trailingAccessory: 'tooltip',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Tooltip',
        leadingAccessory: 'tooltip',
        trailingAccessory: 'tooltip',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Tooltip',
        leadingAccessory: 'tooltip',
        trailingAccessory: 'tooltip',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Icon',
        leadingAccessory: 'icon',
        trailingAccessory: 'icon',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Icon',
        leadingAccessory: 'icon',
        trailingAccessory: 'icon',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Icon',
        leadingAccessory: 'icon',
        trailingAccessory: 'icon',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Image',
        leadingAccessory: 'image',
        trailingAccessory: 'image',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Image',
        leadingAccessory: 'image',
        trailingAccessory: 'image',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Image',
        leadingAccessory: 'image',
        trailingAccessory: 'image',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Button',
        leadingAccessory: 'button',
        trailingAccessory: 'button',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Button',
        leadingAccessory: 'button',
        trailingAccessory: 'button',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Button',
        leadingAccessory: 'button',
        trailingAccessory: 'button',
    })}
      </market-table-v2-row>
    </market-table-v2>
  `,
};
export const FormFields = {
    render: () => html `
    <market-table-v2>
      <market-table-v2-row>
        ${Array.from({ length: 4 }, () => MarketTableV2CellTemplate({
        formField: 'input',
        formFieldPlaceholder: 'Text input',
    }))}
      </market-table-v2-row>
      <market-table-v2-row>
        ${Array.from({ length: 4 }, () => MarketTableV2CellTemplate({
        formField: 'password',
        formFieldPlaceholder: 'Password input',
    }))}
      </market-table-v2-row>
      <market-table-v2-row>
        ${Array.from({ length: 4 }, () => MarketTableV2CellTemplate({
        formField: 'select',
        formFieldPlaceholder: 'Select input',
    }))}
      </market-table-v2-row>
    </market-table-v2>
  `,
};
export const Checkboxes = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        content: 'This,row,has,a,slotted,checkbox',
        header: true,
        control: 'checkbox',
        selected: 'indeterminate',
    })}
      ${MarketTableV2RowTemplate({
        content: 'This,row,has,a,slotted,checkbox',
        control: 'checkbox',
        selected: 'true',
    })}
      ${MarketTableV2RowTemplate({
        content: 'This,row,has,a,slotted,checkbox',
        control: 'checkbox',
    })}
    </market-table-v2>
  `,
};
export const Toggles = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        content: 'This,row,has,a,slotted,toggle',
        header: true,
        control: 'toggle',
        selected: 'indeterminate',
    })}
      ${MarketTableV2RowTemplate({
        content: 'This,row,has,a,slotted,toggle',
        control: 'toggle',
        selected: 'true',
    })}
      ${MarketTableV2RowTemplate({
        content: 'This,row,has,a,slotted,toggle',
        control: 'toggle',
    })}
    </market-table-v2>
  `,
};
//# sourceMappingURL=guide.interactivity.stories.js.map
