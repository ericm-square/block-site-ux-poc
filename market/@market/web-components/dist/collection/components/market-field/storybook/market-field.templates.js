import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketFieldTemplate = ({ 
// demo
action, bottomAccessory, error, 
// props
disabled, invalid, name, readonly, }) => html `
  <market-field ?disabled=${disabled} ?invalid=${invalid} name=${ifDefined(name)} ?readonly=${readonly}>
    <market-input-text>
      <label>Label</label>
    </market-input-text>
    ${action ? html `<small slot="action"><a href="#">Forgot password?</a></small>` : null}
    ${bottomAccessory ? html `<small slot="bottom-accessory">Helper text</small>` : null}
    ${error ? html `<span slot="error">Error text</span>` : null}
  </market-field>
`;
//# sourceMappingURL=market-field.templates.js.map
