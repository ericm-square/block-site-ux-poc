import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Controls/Toggle/API',
    component: 'market-toggle',
    tags: ['autodocs', '!dev'],
    argTypes: {
        focused: { table: { disable: true } },
        hovered: { table: { disable: true } },
        active: { table: { disable: true } },
    },
};
export const API = {
    render: ({ checked, disabled, slot }) => html `
    <market-toggle slot=${ifDefined(slot)} ?checked=${checked} ?disabled=${disabled}></market-toggle>
  `,
};
export const States = {
    render: () => html `
    <market-toggle></market-toggle>
    <market-toggle checked></market-toggle>
    <market-toggle disabled></market-toggle>
    <market-toggle disabled checked></market-toggle>
  `,
};
export const InRow = {
    render: () => html `
    <market-row>
      <label slot="label">Label</label>
      <p slot="subtext">Secondary text</p>
      <market-toggle slot="control"></market-toggle>
    </market-row>
  `,
};
export const InRowLeading = {
    render: () => html `
    <market-row control-position="leading">
      <label slot="label">Label</label>
      <p slot="subtext">Secondary text</p>
      <market-toggle slot="control"></market-toggle>
    </market-row>
  `,
};
export const InList = {
    render: () => html `
    <market-list interactive multiselect value="orange">
      <market-row value="apple">
        <label slot="label">Apple</label>
        <div slot="subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <market-toggle slot="control"></market-toggle>
      </market-row>
      <market-row value="orange">
        <label slot="label">Orange</label>
        <div slot="subtext">Nunc viverra libero vitae rutrum scelerisque</div>
        <market-toggle slot="control"></market-toggle>
      </market-row>
      <market-row value="pear">
        <label slot="label">Pear</label>
        <div slot="subtext">Vivamus tristique libero quis magna mattis facilisis</div>
        <market-toggle slot="control"></market-toggle>
      </market-row>
    </market-list>
  `,
};
//# sourceMappingURL=market-toggle.stories.js.map
