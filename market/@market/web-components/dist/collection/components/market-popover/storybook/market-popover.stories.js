import { html } from "lit";
export default {
    title: 'Components/Popover/API',
    component: 'market-popover',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set demo controls
        content: {
            name: 'Content',
            description: 'The text content of the popover',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        content: 'Content here!',
    },
};
export const API = {
    render: ({ content }) => html ` <market-popover>${content}</market-popover> `,
};
export const WithList = {
    render: () => html `
    <market-popover>
      <market-list>
        <market-row>Apple</market-row>
        <market-row>Orange</market-row>
        <market-row>Pear</market-row>
      </market-list>
    </market-popover>
  `,
};
export const WithTransientList = {
    render: () => html `
    <market-popover>
      <market-list transient>
        <market-row>Apple</market-row>
        <market-row>Orange</market-row>
        <market-row>Pear</market-row>
      </market-list>
    </market-popover>
  `,
};
//# sourceMappingURL=market-popover.stories.js.map
