import { html } from "lit";
import { MarketTableColumnTemplate } from "./market-table-column.templates";
export default {
    title: 'Components/Table/v1/Column/API',
    component: 'market-table-column',
    tags: ['autodocs', '!dev'],
    argTypes: {
        width: { table: { disable: true } },
        index: { table: { disable: true } },
    },
    args: {
        name: 'column-3',
    },
};
export const API = {
    render: (args) => MarketTableColumnTemplate(args),
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
export const HeaderRow = {
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
    </market-table>
  `,
};
export const Sortable = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column sortable name="cycle">Not sorted</market-table-column>
        <market-table-column sortable sort-order="ascending" name="asc">Ascending</market-table-column>
        <market-table-column sortable sort-order="descending" name="desc">Descending</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const StickTo = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column name="left">Left header</market-table-column>
        <market-table-column name="middle" stick-to="right">Middle header</market-table-column>
        <market-table-column name="right">Right header</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Left content</market-table-cell>
        <market-table-cell>Middle column stuck to right edge using "stick-to"</market-table-cell>
        <market-table-cell>Right content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const Hiding = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column name="column-1">Column 1</market-table-column>
        <market-table-column name="column-2" hidden>Column 2</market-table-column>
        <market-table-column name="column-3">Column 3</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
//# sourceMappingURL=market-table-column.stories.js.map
