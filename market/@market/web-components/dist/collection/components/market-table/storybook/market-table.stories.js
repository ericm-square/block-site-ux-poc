import { html } from "lit";
import { MarketTableTemplate } from "./market-table.templates";
export default {
    title: 'Components/Table/v1/Table/API',
    component: 'market-table',
    tags: ['autodocs', '!dev'],
};
export const MarketTable = {
    render: () => MarketTableTemplate(),
};
export const API = {
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
export const ColumnWidths = {
    render: () => html `
    <style type="text/css">
      .custom-column-width {
        grid-template-columns: 150px 1fr 1fr;
      }
    </style>
    <market-table class="custom-column-width">
      <market-table-row slot="header">
        <market-table-column name="column-1">Column width set using CSS class</market-table-column>
        <market-table-column name="column-2">Header content</market-table-column>
        <market-table-column name="column-3">Header content</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    </market-table>
    <market-table style="grid-template-columns: 150px 1fr 1fr;">
      <market-table-row slot="header">
        <market-table-column name="column-1">Column width set using inline style</market-table-column>
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
export const HidingColumns = {
    render: () => html `
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
export const SortableColumns = {
    render: () => html `
    <market-table>
      <market-table-row slot="header">
        <market-table-column name="column-1" sortable>Not sorted</market-table-column>
        <market-table-column name="column-2" sortable sort-order="ascending">Ascending</market-table-column>
        <market-table-column name="column-3" sortable sort-order="descending">Descending</market-table-column>
      </market-table-row>
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    </market-table>
  `,
};
export const StickyHeadersFooters = {
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
export const StickyRows = {
    render: () => html `
    <market-table style="max-height: 244px; overflow-y: auto;">
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
export const StickyColumns = {
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
//# sourceMappingURL=market-table.stories.js.map
