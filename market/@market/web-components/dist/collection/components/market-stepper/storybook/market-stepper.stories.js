import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Stepper/API',
    component: 'market-stepper',
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: ({ decrementAriaLabel, disabled, focused, incrementAriaLabel, inputAriaLabel, inputId, invalid, max, min, name, placeholder, readonly, step, value, }) => html `
    <market-stepper
      decrement-aria-label=${ifDefined(decrementAriaLabel)}
      ?disabled=${disabled}
      ?focused=${focused}
      increment-aria-label=${ifDefined(incrementAriaLabel)}
      input-aria-label=${ifDefined(inputAriaLabel)}
      input-id=${ifDefined(inputId)}
      ?invalid=${invalid}
      max=${ifDefined(max)}
      min=${ifDefined(min)}
      name=${ifDefined(name)}
      placeholder=${ifDefined(placeholder)}
      ?readonly=${readonly}
      step=${ifDefined(step)}
      value=${ifDefined(value)}
    ></market-stepper>
  `,
};
export const WithValue = Object.assign(Object.assign({}, API), { args: { value: 42 } });
export const Invalid = Object.assign(Object.assign({}, API), { args: { invalid: true } });
export const Disabled = Object.assign(Object.assign({}, API), { args: { disabled: true } });
export const MinMax = Object.assign(Object.assign({}, API), { args: { min: -5, max: 5 } });
export const Step = Object.assign(Object.assign({}, API), { args: { step: 100 } });
export const DecimalStep = Object.assign(Object.assign({}, API), { args: { step: 0.01 } });
export const InsideForm = {
    render: () => html `
    <form class="market-grid-container" onsubmit="alert('You submitted the form!'); return false;">
      <div class="market-grid-item-small">
        <market-stepper></market-stepper>
      </div>
      <div class="market-grid-item-small">
        <market-button type="submit" rank="primary">Submit</market-button>
      </div>
    </form>
  `,
};
//# sourceMappingURL=market-stepper.stories.js.map
