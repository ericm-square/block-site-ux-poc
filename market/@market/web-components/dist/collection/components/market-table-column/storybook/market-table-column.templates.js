import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketTableColumnTemplate = ({ align, hidden, name, sortable, sortOrder, stickTo, }) => html `
  <market-table>
    <market-table-row slot="header">
      <market-table-column name="column-1">Column content</market-table-column>
      <market-table-column name="column-2">Column content</market-table-column>
      <market-table-column
        align=${ifDefined(align)}
        ?hidden=${hidden}
        name=${ifDefined(name)}
        ?sortable=${sortable}
        sort-order=${ifDefined(sortOrder)}
        stick-to=${ifDefined(stickTo)}
      >
        Column to apply props to
      </market-table-column>
    </market-table-row>
    <market-table-row>
      <market-table-cell>Cell content</market-table-cell>
      <market-table-cell>Cell content</market-table-cell>
      <market-table-cell>Cell in editable column</market-table-cell>
    </market-table-row>
  </market-table>
`;
//# sourceMappingURL=market-table-column.templates.js.map
