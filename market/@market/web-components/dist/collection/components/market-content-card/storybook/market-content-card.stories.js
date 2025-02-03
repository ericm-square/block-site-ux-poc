import { html } from "lit";
export default {
    title: 'Components/Content Card/API',
    component: 'market-content-card',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set demo controls
        content: {
            name: 'Content',
            description: 'The text content of the card',
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
    render: ({ content }) => html ` <market-content-card>${content}</market-content-card> `,
};
//# sourceMappingURL=market-content-card.stories.js.map
