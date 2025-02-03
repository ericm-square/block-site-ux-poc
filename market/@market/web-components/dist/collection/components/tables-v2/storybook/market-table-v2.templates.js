import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { MarketTableV2CellTemplate } from "../subcomponents/market-table-v2-cell/storybook/market-table-v2-cell.templates";
import { MarketTableV2RowTemplate, } from "../subcomponents/market-table-v2-row/storybook/market-table-v2-row.templates";
import { FruitGroupTemplate, VegetableGroupTemplate, MiscGroupTemplate, } from "../subcomponents/market-table-v2-group/storybook/market-table-v2-group.templates";
export const MarketTableV2Template = ({ 
// props
align, collapsible, layout, reorderable, reorderMode, selected, valign, }) => html `
  <market-table-v2
    align=${ifDefined(align)}
    ?collapsible=${collapsible}
    layout=${ifDefined(layout)}
    reorderable=${ifDefined(reorderable)}
    reorder-mode=${ifDefined(reorderMode)}
    ?selected=${selected}
    valign=${ifDefined(valign)}
  >
    ${MarketTableV2RowTemplate({
    content: 'This,is,a,header,row',
    header: true,
})}
    ${Array.from({ length: 3 }, () => MarketTableV2RowTemplate({ content: 'This,is,a,normal,row' }))}
    ${MarketTableV2RowTemplate({
    content: 'This,is,a,footer,row',
    footer: true,
})}
  </market-table-v2>
`;
export const MarketTableV2ReorderableTemplate = ({ dragHandlePosition, dragHandleVisibility, footer, header, reorderable, reorderMode, style, }) => html `
  <market-table-v2
    style=${ifDefined(style)}
    reorderable=${ifDefined(reorderable)}
    reorder-mode=${ifDefined(reorderMode)}
  >
    ${header
    ? MarketTableV2RowTemplate({
        content: 'Header,is,not,draggable',
        header: true,
        dragHandlePosition,
    })
    : null}
    ${MarketTableV2RowTemplate({
    content: 'First,row,is,draggable',
    dragHandlePosition,
    dragHandleVisibility,
})}
    ${MarketTableV2RowTemplate({
    content: 'Second,row,is,draggable',
    dragHandlePosition,
    dragHandleVisibility,
})}
    ${MarketTableV2RowTemplate({
    content: 'Third,row,is,draggable',
    dragHandlePosition,
    dragHandleVisibility,
})}
    ${MarketTableV2RowTemplate({
    content: 'Fourth,row,is,draggable',
    dragHandlePosition,
    dragHandleVisibility,
})}
    ${MarketTableV2RowTemplate({
    content: 'Fifth,row,is,draggable',
    dragHandlePosition,
    dragHandleVisibility,
})}
    ${footer
    ? MarketTableV2RowTemplate({
        content: 'Footer,is,not,draggable',
        dragHandlePosition,
        footer: true,
    })
    : null}
  </market-table-v2>
`;
export const MarketTableV2CatalogTemplate = ({ actions, collapsed, control, images, reorderable, }) => html `
  <market-table-v2 align="right" collapsible id="table-item-catalog-example" reorderable=${ifDefined(reorderable)}>
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Item,Qty,Date,Time,Price',
    control,
    header: true,
    sticky: 'top',
})}
    ${FruitGroupTemplate({ actions, collapsed, control, images })}
    ${VegetableGroupTemplate({ actions, collapsed, control, images })}
    ${MiscGroupTemplate({ actions, collapsed, control, images })}
  </market-table-v2>
  <style>
    #table-item-catalog-example market-table-v2-cell:first-child {
      text-align: left;
    }
    #table-item-catalog-example market-button-dropdown {
      text-align: left;
    }
    #table-item-catalog-example market-button {
      margin: -10px 0;
      vertical-align: middle;
    }
  </style>
`;
const MarketTableV2BulkEditRowTemplate = ({ content, disableSelects, parent, }) => {
    const cellContent = content.split(',');
    return html `
    <market-table-v2-row slot=${parent ? 'parent' : null}>
      ${MarketTableV2CellTemplate({
        control: 'checkbox',
        formField: 'input',
        formFieldValue: cellContent[0],
        leadingAccessory: 'image',
        sticky: 'left',
    })}
      ${MarketTableV2CellTemplate({
        formField: 'input',
        formFieldValue: cellContent[1],
    })}
      <market-table-v2-cell>
        <market-select value="${cellContent[2]}" ?disabled=${disableSelects}>
          <market-list slot="list">
            <market-row value="Apparel">Apparel</market-row>
            <market-row value="Shoes">Shoes</market-row>
          </market-list>
        </market-select>
      </market-table-v2-cell>
      ${MarketTableV2CellTemplate({
        formField: 'input',
        formFieldValue: cellContent[3],
    })}
      <market-table-v2-cell>
        <market-select value="ABC Vendor" ?disabled=${disableSelects}>
          <market-list slot="list">
            <market-row value="ABC Vendor">ABC Vendor</market-row>
          </market-list>
        </market-select>
      </market-table-v2-cell>
    </market-table-v2-row>
  `;
};
export const MarketTableV2BulkEditTemplate = () => html `
  <market-table-v2 id="bulk-edit-example">
    <market-table-v2-row header sticky="top">
      ${MarketTableV2CellTemplate({
    content: 'Item',
    control: 'checkbox',
    role: 'columnheader',
    sticky: 'left',
})}
      ${MarketTableV2CellTemplate({
    content: 'SKU',
    role: 'columnheader',
})}
      ${MarketTableV2CellTemplate({
    content: 'Category',
    role: 'columnheader',
})}
      ${MarketTableV2CellTemplate({
    content: 'Price',
    role: 'columnheader',
})}
      ${MarketTableV2CellTemplate({
    content: 'Default Vendor',
    role: 'columnheader',
})}
    </market-table-v2-row>
    <market-table-v2-group>
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Crew Neck T-shirt,A-12345,Apparel,$16.80,ABC Vendor',
    parent: true,
})}
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Small,A-12345,Apparel,$16.80,ABC Vendor',
    disableSelects: true,
})}
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Medium,A-12345,Apparel,$16.80,ABC Vendor',
    disableSelects: true,
})}
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Large,A-12345,Apparel,$16.80,ABC Vendor',
    disableSelects: true,
})}
    </market-table-v2-group>
    ${MarketTableV2BulkEditRowTemplate({
    content: 'Leather tote,A-12345,Apparel,$54.00,ABC Vendor',
})}
    ${MarketTableV2BulkEditRowTemplate({
    content: 'The Jane Sandal,A-12345,Shoes,$24.00,ABC Vendor',
})}
    ${MarketTableV2BulkEditRowTemplate({
    content: 'Full Length Anorak,A-12345,Apparel,$68.90,ABC Vendor',
})}
    <market-table-v2-group>
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Crew Neck Sweatshirt,A-12345,Apparel,$28.50,ABC Vendor',
    parent: true,
})}
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Small,A-12345,Apparel,$28.50,ABC Vendor',
    disableSelects: true,
})}
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Medium,A-12345,Apparel,$28.50,ABC Vendor',
    disableSelects: true,
})}
      ${MarketTableV2BulkEditRowTemplate({
    content: 'Large,A-12345,Apparel,$28.50,ABC Vendor',
    disableSelects: true,
})}
    </market-table-v2-group>
  </market-table-v2>
  <style>
    #bulk-edit-example {
      max-height: 340px;
    }
    #bulk-edit-example market-table-v2-cell {
      min-width: 180px;
    }
    #bulk-edit-example market-table-v2-cell:first-of-type {
      min-width: 360px;
    }
  </style>
`;
//# sourceMappingURL=market-table-v2.templates.js.map
