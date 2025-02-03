import { html } from "lit";
import { MarketDialogTemplate } from "./market-dialog.templates";
import "./market-dialog.stories.css";
export default {
    title: 'Components/Modals/Dialog/API',
    component: 'market-dialog',
    argTypes: {
        // demo
        apiMessage: {
            name: 'API message',
            description: 'Display the Storybook API & source code message.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        bodyText: {
            name: 'Body text',
            description: 'The body content of the dialog.',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        buttonGroup: {
            name: 'Button group',
            description: 'Slot a footer with a button group.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        buttonGroupAlignment: {
            name: 'Button group alignment',
            description: 'Switch the alignment of the slotted button group.',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: ['fill', 'left', 'right', 'split', 'stack'],
        },
        headerText: {
            name: 'Header text',
            description: 'The header content of the dialog.',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        // props
        animationEnterDuration: { table: { disable: true } },
        animationExitDuration: { table: { disable: true } },
        dialogID: { table: { disable: true } },
        hidden: { table: { disable: true } },
        index: { table: { disable: true } },
    },
    args: {
        // demo
        apiMessage: true,
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et turpis lobortis, consectetur massa at, molestie urna. Nam ipsum enim, tincidunt at tempor sed, imperdiet a est. Praesent nisl felis, placerat et lobortis vitae, ultricies eu velit.',
        buttonGroup: true,
        buttonGroupAlignment: 'fill',
        headerText: 'Modal Title',
    },
    parameters: {
        layout: 'fullscreen',
        controls: { expanded: true },
    },
};
export const API = {
    render: (args) => MarketDialogTemplate(args),
    decorators: [
        (story, { viewMode }) => {
            // if this is the API page, wrap with context
            return viewMode === 'story' ? html `<market-context>${story()}</market-context>` : story();
        },
    ],
};
//# sourceMappingURL=market-dialog.stories.js.map
