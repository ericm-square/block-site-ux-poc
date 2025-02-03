import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "./market-button-dropdown.stories.css";
export default {
    title: 'Components/Button Dropdown/API',
    component: 'market-button-dropdown',
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: ({ interaction, disabled, noCaret, popoverPlacement, popoverStrategy, persistListSelections }) => html `
    <market-button-dropdown
      interaction=${ifDefined(interaction)}
      ?disabled=${disabled}
      ?no-caret=${noCaret}
      popover-placement=${ifDefined(popoverPlacement)}
      popover-strategy=${ifDefined(popoverStrategy)}
      ?persist-list=${persistListSelections}
    >
      <market-button slot="trigger">Trigger</market-button>
      <div slot="content">Lorem ipsum dolor sit amet</div>
    </market-button-dropdown>
  `,
};
export const ListExample = {
    render: () => html `
    <p>
      <strong>NOTE:</strong> Lists in dropdowns automatically have their <code>interactive</code> and
      <code>transient</code> properties set to <code>true</code>, so that lists options can be selected, but they do not
      persist between opens of the dropdown. If you want to instead persist list selections, you can add the
      <code>persist-list</code> attribute.
    </p>
    <market-button-dropdown popover-placement="bottom-end">
      <market-button slot="trigger">Trigger</market-button>
      <market-list transient slot="content">
        <market-row>Apple</market-row>
        <market-row>Orange</market-row>
        <market-row>Banana</market-row>
      </market-list>
    </market-button-dropdown>
  `,
};
export const PersistentExample = {
    render: () => html `
    <market-button-dropdown popover-placement="bottom-end" interaction="persistent">
      <market-button slot="trigger">Trigger</market-button>
      <market-list transient slot="content">
        <market-row>Apple</market-row>
        <market-row>Orange</market-row>
        <market-row>Banana</market-row>
      </market-list>
    </market-button-dropdown>
  `,
};
export const FilterListExample = {
    render: () => html `
    <market-button-dropdown
      popover-placement="bottom-end"
      interaction="persistent"
    >
      <market-filter-button slot="trigger">
        Fruit
        <span slot="feedback">Orange</slot>
      </market-filter-button>
      <market-list transient slot="content">
        <market-row>Apple</market-row>
        <market-row>Orange</market-row>
        <market-row>Banana</market-row>
      </market-list>
    </market-button-dropdown>
  `,
};
//# sourceMappingURL=market-button-dropdown.stories.js.map
