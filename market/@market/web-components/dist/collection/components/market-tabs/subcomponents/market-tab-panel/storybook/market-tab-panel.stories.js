import { TabPanelTemplate } from "./market-tab-panel.templates";
export default {
    title: 'Components/Tabs/Tab Panel/API',
    component: 'market-tab-panel',
    tags: ['autodocs', '!dev'],
    argTypes: {
        content: {
            control: { type: 'text' },
            description: 'Panel content',
            name: 'Text content',
            table: { category: 'Demo' },
        },
    },
    args: {
        content: 'Text content',
    },
};
export const API = {
    render: (args) => TabPanelTemplate(args),
};
export const Hidden = Object.assign(Object.assign({}, API), { args: {
        hidden: true,
    } });
//# sourceMappingURL=market-tab-panel.stories.js.map
