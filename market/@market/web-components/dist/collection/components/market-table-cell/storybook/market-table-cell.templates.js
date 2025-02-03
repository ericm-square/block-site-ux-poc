import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SlottedAccessory } from "../../../../docs/helpers/slotted-accessory";
import { MarketSelectTemplate } from "../../market-select/storybook/market-select.templates";
export const MarketTableCellTemplate = ({ 
// demo
content, formField, formFieldLabel, formFieldPlaceholder, formFieldValue, leadingAccessory, trailingAccessory, 
// props
active, align, column, disabled, interactive, leadingIndentation, }) => html `
  <market-table-cell
    ?active=${active}
    align=${ifDefined(align)}
    column=${ifDefined(column)}
    ?disabled=${disabled}
    ?interactive=${interactive}
    leading-indentation=${ifDefined(leadingIndentation)}
  >
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
            : content
                ? html `${content}`
                : null}
    ${trailingAccessory ? SlottedAccessory({ type: trailingAccessory, placement: 'trailing' }) : null}
  </market-table-cell>
`;
//# sourceMappingURL=market-table-cell.templates.js.map
