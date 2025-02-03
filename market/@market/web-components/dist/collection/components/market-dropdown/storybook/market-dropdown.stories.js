import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "./market-dropdown.stories.css";
export default {
    title: 'Components/Dropdown/API',
    component: 'market-dropdown',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set demo controls
        content: {
            name: 'Content',
            description: 'The slotted text content of the popover',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        triggerText: {
            name: 'Trigger text',
            description: 'The slotted text content of the trigger button',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        content: 'Content here!',
        triggerText: 'Trigger',
    },
};
export const API = {
    render: ({ 
    // demo
    content, triggerText, 
    // props
    interaction, disabled, expanded, popoverPlacement, popoverDistance, popoverSkidding, popoverStrategy, }) => html `
    <market-dropdown
      interaction=${ifDefined(interaction)}
      ?disabled=${disabled}
      ?expanded=${expanded}
      popover-distance=${ifDefined(popoverDistance)}
      popover-placement=${ifDefined(popoverPlacement)}
      popover-skidding=${ifDefined(popoverSkidding)}
      popover-strategy=${ifDefined(popoverStrategy)}
    >
      <market-link slot="trigger">${triggerText}</market-link>
      <market-popover slot="popover">${content}</market-popover>
    </market-dropdown>
  `,
};
export const WithList = {
    render: () => html `
    <market-dropdown>
      <market-link slot="trigger">Trigger</market-link>
      <market-popover slot="popover">
        <market-list transient>
          <market-row>Apple</market-row>
          <market-row>Orange</market-row>
          <market-row>Banana</market-row>
        </market-list>
      </market-popover>
    </market-dropdown>
  `,
};
export const MoreExamples = {
    render: () => html `
    <market-dropdown>
      <market-link slot="trigger">Dropdown</market-link>
      <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
    </market-dropdown>

    <market-button-dropdown>
      <market-button slot="trigger">Button</market-button>
      <span slot="content">Lorem ipsum dolor sit amet</span>
    </market-button-dropdown>

    <market-tooltip interaction="hover">
      <span slot="trigger">Tooltip</span>
      <span slot="content">Lorem ipsum dolor sit amet <a href="#">Link</a></span>
    </market-tooltip>

    <market-button-group>
      <market-button rank="primary">Apple</market-button>
      <market-button>Orange</market-button>
      <market-button>Pear</market-button>
      <market-button disabled="true">Banana</market-button>
    </market-button-group>
  `,
};
//# sourceMappingURL=market-dropdown.stories.js.map
