import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketChoiceButtonTemplate = ({ 
// demo
text, secondaryText, 
// props
disabled, selected, size, }) => html `
  <market-choice-button ?disabled=${disabled} ?selected=${selected} size=${ifDefined(size)}>
    ${text} ${secondaryText ? html `<label slot="secondary-text">${secondaryText}</label>` : null}
  </market-choice-button>
`;
export const MarketChoiceButtonTableTemplate = ({ size }) => html `
  <table class="market-choice-button-table">
    <tr>
      <td>
        ${MarketChoiceButtonTemplate({
    size,
    text: 'Choice',
})}
      </td>
      <td>
        ${MarketChoiceButtonTemplate({
    selected: true,
    size,
    text: 'Choice',
})}
      </td>
      <td>
        ${MarketChoiceButtonTemplate({
    disabled: true,
    size,
    text: 'Choice',
})}
      </td>
      <td>
        ${MarketChoiceButtonTemplate({
    disabled: true,
    selected: true,
    size,
    text: 'Choice',
})}
      </td>
    </tr>
    <tr>
      <td>
        ${MarketChoiceButtonTemplate({
    secondaryText: '$1',
    size,
    text: 'Choice',
})}
      </td>
      <td>
        ${MarketChoiceButtonTemplate({
    selected: true,
    secondaryText: '$1',
    size,
    text: 'Choice',
})}
      </td>
      <td>
        ${MarketChoiceButtonTemplate({
    disabled: true,
    secondaryText: '$1',
    size,
    text: 'Choice',
})}
      </td>
      <td>
        ${MarketChoiceButtonTemplate({
    disabled: true,
    selected: true,
    secondaryText: '$1',
    size,
    text: 'Choice',
})}
      </td>
    </tr>
  </table>
`;
//# sourceMappingURL=market-choice-button.templates.js.map
