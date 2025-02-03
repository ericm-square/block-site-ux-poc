import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketTableRowTemplate = ({ 
// props
active, disabled, interactive, leadingIndentation, selected, stickTo, sticky, }) => html `
  <market-table>
    <market-table-row>
      <market-table-cell>Cell content</market-table-cell>
      <market-table-cell>Cell content</market-table-cell>
      <market-table-cell>Cell content</market-table-cell>
    </market-table-row>
    <market-table-row
      ?active=${active}
      ?disabled=${disabled}
      ?interactive=${interactive}
      leading-indentation=${ifDefined(leadingIndentation)}
      ?selected=${selected}
      stick-to=${ifDefined(stickTo)}
      ?sticky=${sticky}
    >
      <market-table-cell>Row to apply props to</market-table-cell>
      <market-table-cell>Row to apply props to</market-table-cell>
      <market-table-cell>Row to apply props to</market-table-cell>
    </market-table-row>
    <market-table-row>
      <market-table-cell>Cell content</market-table-cell>
      <market-table-cell>Cell content</market-table-cell>
      <market-table-cell>Cell content</market-table-cell>
    </market-table-row>
  </market-table>
`;
//# sourceMappingURL=market-table-row.templates.js.map
