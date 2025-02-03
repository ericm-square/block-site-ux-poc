import { html } from "lit";
export const MarketTableTemplate = () => html `
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
`;
//# sourceMappingURL=market-table.templates.js.map
