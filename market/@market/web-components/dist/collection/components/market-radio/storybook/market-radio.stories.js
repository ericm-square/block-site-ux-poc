import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Controls/Radio/API',
    component: 'market-radio',
    tags: ['autodocs', '!dev'],
    argTypes: {
        focused: { table: { disable: true } },
        hovered: { table: { disable: true } },
        active: { table: { disable: true } },
    },
};
export const API = {
    render: ({ selected, disabled, invalid, slot }) => html `
    <market-radio
      slot=${ifDefined(slot)}
      ?selected=${selected}
      ?disabled=${disabled}
      ?invalid=${invalid}
    ></market-radio>
  `,
};
export const States = {
    render: () => html `
    <market-radio></market-radio>
    <market-radio selected></market-radio>
    <market-radio disabled></market-radio>
    <market-radio disabled selected></market-radio>
  `,
};
export const InRow = {
    render: () => html `
    <market-row>
      <label slot="label">Label</label>
      <p slot="subtext">Secondary text</p>
      <market-radio slot="control"></market-radio>
    </market-row>
  `,
};
export const InRowLeading = {
    render: () => html `
    <market-row control-position="leading">
      <label slot="label">Label</label>
      <p slot="subtext">Secondary text</p>
      <market-radio slot="control"></market-radio>
    </market-row>
  `,
};
export const InList = {
    render: () => html `
    <market-list interactive value="orange">
      <market-row value="apple">
        <label slot="label">Apple</label>
        <div slot="subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <market-radio slot="control"></market-radio>
      </market-row>
      <market-row value="orange">
        <label slot="label">Orange</label>
        <div slot="subtext">Nunc viverra libero vitae rutrum scelerisque</div>
        <market-radio slot="control"></market-radio>
      </market-row>
      <market-row value="pear">
        <label slot="label">Pear</label>
        <div slot="subtext">Vivamus tristique libero quis magna mattis facilisis</div>
        <market-radio slot="control"></market-radio>
      </market-row>
    </market-list>
  `,
};
//# sourceMappingURL=market-radio.stories.js.map
