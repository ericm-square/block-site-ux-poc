import { html } from "lit";
import { MarketBladeTemplate } from "./market-blade.templates";
export default {
    title: 'Components/Modals/Blade/API',
    component: 'market-blade',
    argTypes: {
        // demo
        actions: {
            name: 'Actions',
            description: 'Slot action buttons into the header of the blade.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        apiMessage: {
            name: 'API message',
            description: 'Display the Storybook API & source code message.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        footer: {
            name: 'Footer',
            description: 'Slot a footer into the blade.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        header: {
            name: 'Header',
            description: 'Slot a header into the blade.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        paragraphs: {
            name: 'Paragraphs',
            description: 'Number of paragrahs inside the blade body.',
            control: { type: 'number' },
            table: { category: 'Demo' },
        },
        // props
        animationDuration: { table: { disable: true } },
        animationEnterDuration: { table: { disable: true } },
        animationExitDuration: { table: { disable: true } },
        dialogID: { table: { disable: true } },
        hidden: { table: { disable: true } },
        index: { table: { disable: true } },
    },
    args: {
        // demo
        actions: true,
        apiMessage: true,
        footer: false,
        header: true,
        paragraphs: 5,
    },
    parameters: {
        layout: 'fullscreen',
        controls: { expanded: true },
    },
};
export const API = {
    render: (args) => MarketBladeTemplate(args),
    decorators: [
        (story, { viewMode }) => {
            // if this is the API page, wrap with context
            return viewMode === 'story' ? html `<market-context>${story()}</market-context>` : story();
        },
    ],
};
//# sourceMappingURL=market-blade.stories.js.map
