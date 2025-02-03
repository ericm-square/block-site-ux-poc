import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { MarketTableV2CellTemplate } from "../../market-table-v2-cell/storybook/market-table-v2-cell.templates";
export const MarketTableV2RowTemplate = ({ 
// demo
actions, content, control, leadingAccessory, nowrap, slot, sortable, stickyLeft, stickyRight, 
// props
active, align, caret, disabled, dragEnabled, dragHandlePosition, dragHandleVisibility, footer, header, indent, interactive, selected, sticky, valign, }) => html `
  <market-table-v2-row
    ?active=${active}
    align=${ifDefined(align)}
    caret=${ifDefined(caret)}
    ?disabled=${disabled}
    ?drag-enabled=${dragEnabled}
    drag-handle-position=${ifDefined(dragHandlePosition)}
    drag-handle-visibility=${ifDefined(dragHandleVisibility)}
    ?footer=${footer}
    ?header=${header}
    indent=${ifDefined(indent)}
    ?interactive=${interactive}
    selected=${ifDefined(selected)}
    slot=${ifDefined(slot)}
    sticky=${ifDefined(sticky)}
    valign=${ifDefined(valign)}
  >
    ${content === null || content === void 0 ? void 0 : content.split(',').map((text, i) => {
    return MarketTableV2CellTemplate({
        content: text,
        control: control && i === 0 ? control : 'none',
        leadingAccessory: leadingAccessory && i === 0 ? leadingAccessory : 'none',
        nowrap,
        role: header ? 'columnheader' : undefined,
        sortable,
        sticky: getCellSticky({ content, index: i, stickyLeft, stickyRight }),
    });
})}
    ${actions
    ? header
        ? MarketTableV2CellTemplate({
            align: 'right',
            content: 'Edit',
            role: 'columnheader',
        })
        : MarketTableV2CellTemplate({
            actions: true,
            align: 'right',
        })
    : null}
  </market-table-v2-row>
`;
const getCellSticky = ({ content, index, stickyLeft, stickyRight, }) => {
    if (stickyLeft && index === 0)
        return 'left';
    if (stickyRight && index === content.split(',').length - 1)
        return 'right';
    return undefined;
};
//# sourceMappingURL=market-table-v2-row.templates.js.map
