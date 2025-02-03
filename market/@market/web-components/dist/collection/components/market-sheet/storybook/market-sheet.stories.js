import { html } from "lit";
import { MarketSheetTemplate } from "./market-sheet.templates";
export default {
    title: 'Components/Modals/Sheet (BETA)/API',
    component: 'market-sheet',
    argTypes: {
        // demo
        actions: {
            name: 'Actions',
            description: 'Slot action buttons into the header of the sheet.',
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
            description: 'Slot a footer into the sheet.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        header: {
            name: 'Header',
            description: 'Slot a header into the sheet.',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        paragraphs: {
            name: 'Paragraphs',
            description: 'Number of paragrahs inside the sheet body.',
            control: { type: 'number' },
            table: { category: 'Demo' },
        },
        // props
        animationDuration: { table: { disable: true } },
        animationEnterDuration: { table: { disable: true } },
        animationExitDuration: { table: { disable: true } },
        dataDialogId: { table: { disable: true } },
        dataDialogIndex: { table: { disable: true } },
        hidden: { table: { disable: true } },
    },
    args: {
        // demo
        actions: true,
        apiMessage: true,
        footer: true,
        header: true,
        paragraphs: 5,
    },
    parameters: {
        layout: 'fullscreen',
        controls: { expanded: true },
    },
};
export const API = {
    render: (args) => MarketSheetTemplate(args),
    decorators: [
        (story, { viewMode }) => {
            // if this is the API page, wrap with context
            return viewMode === 'story' ? html `<market-context>${story()}</market-context>` : story();
        },
    ],
};
//# sourceMappingURL=market-sheet.stories.js.map
