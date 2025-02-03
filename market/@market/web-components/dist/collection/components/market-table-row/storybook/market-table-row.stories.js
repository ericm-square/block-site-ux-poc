import { html } from "lit";
import { MarketTableRowTemplate } from "./market-table-row.templates";
export default {
    title: 'Components/Table/v1/Row/API',
    component: 'market-table-row',
    tags: ['autodocs', '!dev'],
    argTypes: {
        header: { table: { disable: true } },
        footer: { table: { disable: true } },
        originalSlot: { table: { disable: true } },
        tableColumns: { table: { disable: true } },
        cells: { table: { disable: true } },
        gridTemplateMain: { table: { disable: true } },
        gridTemplateLeft: { table: { disable: true } },
        gridTemplateRight: { table: { disable: true } },
        expanded: { table: { disable: true } },
        nested: { table: { disable: true } },
        index: { table: { disable: true } },
    },
};
export const API = {
    render: (args) => MarketTableRowTemplate(args),
};
export const BasicExample = {
    render: () => html `
    <market-table>
      <market-table-row>
        <market-table-column name="column-1">Column content</market-table-column>
        <market-table-column name="column-2">Column content</market-table-column>
        <market-table-column name="column-3">Column content</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const HeaderFooter = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column name="column-1">Header content</market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row slot="footer">
        <market-table-cell>Footer content</market-table-cell>
        <market-table-cell>Footer content</market-table-cell>
        <market-table-cell>Footer content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const Sticky = {
    render: () => html `
    <market-table style="max-height: 200px; overflow: auto;">
      <market-table-row slot="header" sticky>
        <market-table-column name="column-1">Header content</market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row sticky>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row slot="footer" sticky>
        <market-table-cell>Footer content</market-table-cell>
        <market-table-cell>Footer content</market-table-cell>
        <market-table-cell>Footer content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const StickTo = {
    render: () => html `
    <market-table style="max-height: 244px; overflow: auto;">
      <market-table-row slot="header" sticky>
        <market-table-column name="column-1">Header content</market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row stick-to="top">
        <market-table-cell>Sticking row to top</market-table-cell>
        <market-table-cell>Sticking row to top</market-table-cell>
        <market-table-cell>Sticking row to top</market-table-cell>
      </market-table-row>
      <market-table-row stick-to="bottom">
        <market-table-cell>Sticking row to bottom</market-table-cell>
        <market-table-cell>Sticking row to bottom</market-table-cell>
        <market-table-cell>Sticking row to bottom</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const Indentation = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column name="column-1">Header content</market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
      <market-table-row leading-indentation="1">
        <market-table-cell>Indented row</market-table-cell>
        <market-table-cell>Indented row</market-table-cell>
        <market-table-cell>Indented row</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const Interactivity = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column name="column-1">Header content</market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row interactive>
        <market-table-cell>Interactive row</market-table-cell>
        <market-table-cell>Interactive row</market-table-cell>
        <market-table-cell>Interactive row</market-table-cell>
      </market-table-row>
      <market-table-row active>
        <market-table-cell>Active row</market-table-cell>
        <market-table-cell>Active row</market-table-cell>
        <market-table-cell>Active row</market-table-cell>
      </market-table-row>
      <market-table-row disabled>
        <market-table-cell>Disabled row</market-table-cell>
        <market-table-cell>Disabled row</market-table-cell>
        <market-table-cell>Disabled row</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const Checkboxes = {
    render: () => html `
    <market-table
      style="grid-template-columns: calc(var(--table-cell-horizontal-padding-size, 8px) *2 + var(--checkbox-width)) repeat(3, 1fr)"
    >
      <market-table-row slot="header">
        <market-table-column slot="control">
          <market-checkbox></market-checkbox>
        </market-table-column>
        <market-table-column name="column-1"> Header content </market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell slot="control">
          <market-checkbox></market-checkbox>
        </market-table-cell>
        <market-table-cell> Checkbox row </market-table-cell>
        <market-table-cell>Checkbox row</market-table-cell>
        <market-table-cell>Checkbox row</market-table-cell>
      </market-table-row>
      <market-table-row interactive>
        <market-table-cell slot="control">
          <market-checkbox></market-checkbox>
        </market-table-cell>
        <market-table-cell> Interactive Checkbox row </market-table-cell>
        <market-table-cell>Interactive Checkbox row</market-table-cell>
        <market-table-cell>Interactive Checkbox row</market-table-cell>
      </market-table-row>
      <market-table-row disabled>
        <market-table-cell slot="control">
          <market-checkbox></market-checkbox>
        </market-table-cell>
        <market-table-cell> Disabled checkbox row </market-table-cell>
        <market-table-cell>Disabled checkbox row</market-table-cell>
        <market-table-cell>Disabled checkbox row</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const Toggles = {
    render: () => html `
    <market-table
      style="grid-template-columns: calc(var(--table-cell-horizontal-padding-size, 8px) *2 + var(--toggle-width)) repeat(3, 1fr)"
    >
      <market-table-row slot="header">
        <market-table-column slot="control">
          <market-toggle />
        </market-table-column>
        <market-table-column name="column-1"> Header content </market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell slot="control">
          <market-toggle />
        </market-table-cell>
        <market-table-cell> Checkbox row </market-table-cell>
        <market-table-cell>Checkbox row</market-table-cell>
        <market-table-cell>Checkbox row</market-table-cell>
      </market-table-row>
      <market-table-row interactive>
        <market-table-cell slot="control">
          <market-toggle />
        </market-table-cell>
        <market-table-cell> Interactive Checkbox row </market-table-cell>
        <market-table-cell>Interactive Checkbox row</market-table-cell>
        <market-table-cell>Interactive Checkbox row</market-table-cell>
      </market-table-row>
      <market-table-row disabled>
        <market-table-cell slot="control">
          <market-toggle />
        </market-table-cell>
        <market-table-cell> Disabled checkbox row </market-table-cell>
        <market-table-cell>Disabled checkbox row</market-table-cell>
        <market-table-cell>Disabled checkbox row</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const NestedCheckboxes = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column slot="control">
          <market-checkbox></market-checkbox>
        </market-table-column>
        <market-table-column name="column-1">Header content</market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-accordion-item>
        <market-table-row slot="custom-trigger">
          <market-table-cell slot="control">
            <market-checkbox></market-checkbox>
          </market-table-cell>
          <market-table-cell> Cell content </market-table-cell>
          <market-table-cell>Cell content</market-table-cell>
          <market-table-cell>Cell content</market-table-cell>
        </market-table-row>
        <market-table-row>
          <market-table-cell slot="control">
            <market-checkbox></market-checkbox>
          </market-table-cell>
          <market-table-cell> Cell content </market-table-cell>
          <market-table-cell>Cell content</market-table-cell>
          <market-table-cell>Cell content</market-table-cell>
        </market-table-row>
        <market-accordion-item>
          <market-table-row slot="custom-trigger">
            <market-table-cell slot="control">
              <market-checkbox></market-checkbox>
            </market-table-cell>
            <market-table-cell> Cell content </market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell slot="control">
              <market-checkbox></market-checkbox>
            </market-table-cell>
            <market-table-cell> Cell content </market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell slot="control">
              <market-checkbox></market-checkbox>
            </market-table-cell>
            <market-table-cell> Cell content </market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
        </market-accordion-item>
      </market-accordion-item>
    </market-table>
  `,
};
//# sourceMappingURL=market-table-row.stories.js.map
