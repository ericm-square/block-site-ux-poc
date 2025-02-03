import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SlottedAccessory } from "../../../../../../docs/helpers/slotted-accessory";
import { SlottedControl } from "../../../../../../docs/helpers/slotted-control";
import { MarketSelectTemplate } from "../../../../market-select/storybook/market-select.templates";
export const MarketTableV2CellTemplate = ({ 
// demo
actions, content, control, formField, formFieldLabel, formFieldPlaceholder, formFieldValue, leadingAccessory, trailingAccessory, role, 
// props
active, align, caret, caretAriaLabelCollapsed, caretAriaLabelExpanded, disabled, indent, interactive, nowrap, selected, sortable, sortAriaLabelAscending, sortAriaLabelDescending, sortAriaLabelNone, sortOrder, sortStrategy, sortStrategyFormat, sticky, valign, }) => html `
  <market-table-v2-cell
    ?active=${active}
    align=${ifDefined(align)}
    caret=${ifDefined(caret)}
    caret-aria-label-collapsed=${ifDefined(caretAriaLabelCollapsed)}
    caret-aria-label-expanded=${ifDefined(caretAriaLabelExpanded)}
    ?disabled=${disabled}
    indent=${ifDefined(indent)}
    ?interactive=${interactive}
    ?nowrap=${nowrap}
    role=${ifDefined(role)}
    selected=${ifDefined(selected)}
    ?sortable=${sortable}
    sort-aria-label-ascending=${ifDefined(sortAriaLabelAscending)}
    sort-aria-label-descending=${ifDefined(sortAriaLabelDescending)}
    sort-aria-label-none=${ifDefined(sortAriaLabelNone)}
    sort-order=${ifDefined(sortOrder)}
    sort-strategy=${ifDefined(sortStrategy)}
    sort-strategy-format=${ifDefined(sortStrategyFormat)}
    sticky=${ifDefined(sticky)}
    valign=${ifDefined(valign)}
  >
    ${control ? SlottedControl({ type: control }) : null}
    ${leadingAccessory ? SlottedAccessory({ type: leadingAccessory, placement: 'leading' }) : null}
    ${formField === 'input'
    ? html `
          <market-input-text
            placeholder="${ifDefined(formFieldPlaceholder)}"
            size="small"
            value="${ifDefined(formFieldValue)}"
          >
            <label>${formFieldLabel ? formFieldLabel : content}</label>
          </market-input-text>
        `
    : formField === 'password'
        ? html `
          <market-input-password
            placeholder="${ifDefined(formFieldPlaceholder)}"
            size="small"
            value="${ifDefined(formFieldValue)}"
          >
            <label>${formFieldLabel ? formFieldLabel : content}</label>
          </market-input-password>
        `
        : formField === 'select'
            ? MarketSelectTemplate({
                itemCount: 5,
                label: formFieldLabel,
                placeholder: formFieldPlaceholder,
                size: 'small',
                value: formFieldValue,
            })
            : actions
                ? ActionsMenuTemplate()
                : content
                    ? html `${content}`
                    : null}
    ${trailingAccessory ? SlottedAccessory({ type: trailingAccessory, placement: 'trailing' }) : null}
  </market-table-v2-cell>
`;
const ActionsMenuTemplate = () => html `
  <market-button-dropdown no-caret popover-placement="bottom-end">
    <market-button slot="trigger" size="small" rank="tertiary" icon-only>
      <market-icon name="more"></market-icon>
    </market-button>
    <market-list slot="content">
      <market-row size="small"><label slot="label">Rename</label></market-row>
      <market-row size="small"><label slot="label">Archive</label></market-row>
      <market-row size="small" destructive><label slot="label">Delete</label></market-row>
    </market-list>
  </market-button-dropdown>
`;
//# sourceMappingURL=market-table-v2-cell.templates.js.map
