import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Controls/Checkbox/API',
    component: 'market-checkbox',
    tags: ['autodocs', '!dev'],
    argTypes: {
        focused: { table: { disable: true } },
        hovered: { table: { disable: true } },
        active: { table: { disable: true } },
    },
};
export const API = {
    render: ({ checked, disabled, indeterminate, invalid, slot }) => html `
    <market-checkbox
      slot=${ifDefined(slot)}
      ?checked=${checked}
      ?disabled=${disabled}
      ?indeterminate=${indeterminate}
      ?invalid=${invalid}
    ></market-checkbox>
  `,
};
export const States = {
    render: () => html `
    <market-checkbox></market-checkbox>
    <market-checkbox indeterminate></market-checkbox>
    <market-checkbox checked></market-checkbox>
    <market-checkbox disabled></market-checkbox>
    <market-checkbox disabled indeterminate></market-checkbox>
    <market-checkbox disabled checked></market-checkbox>
  `,
};
export const InRow = {
    render: () => html `
    <market-row>
      <label slot="label">Label</label>
      <p slot="subtext">Secondary text</p>
      <market-checkbox slot="control"></market-checkbox>
    </market-row>
  `,
};
export const InRowLeading = {
    render: () => html `
    <market-row control-position="leading">
      <label slot="label">Label</label>
      <p slot="subtext">Secondary text</p>
      <market-checkbox slot="control"></market-checkbox>
    </market-row>
  `,
};
export const InList = {
    render: () => html `
    <market-list interactive multiselect value="orange">
      <market-row value="apple">
        <label slot="label">Apple</label>
        <div slot="subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <market-checkbox slot="control"></market-checkbox>
      </market-row>
      <market-row value="orange">
        <label slot="label">Orange</label>
        <div slot="subtext">Nunc viverra libero vitae rutrum scelerisque</div>
        <market-checkbox slot="control"></market-checkbox>
      </market-row>
      <market-row value="pear">
        <label slot="label">Pear</label>
        <div slot="subtext">Vivamus tristique libero quis magna mattis facilisis</div>
        <market-checkbox slot="control"></market-checkbox>
      </market-row>
    </market-list>
  `,
};
//# sourceMappingURL=market-checkbox.stories.js.map
