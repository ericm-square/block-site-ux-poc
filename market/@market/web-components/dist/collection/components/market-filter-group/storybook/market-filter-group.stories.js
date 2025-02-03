import { DefaultTemplate } from "./market-filter-group.templates";
import { fixFilterZIndex } from "../../market-filter/storybook/utils";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
export default {
    title: 'Components/Filter (BETA)/Group/API',
    tags: ['autodocs', '!dev'],
    component: 'market-filter-group',
    argTypes: {
        hasSearch: {
            control: { type: 'boolean' },
            description: 'Whether to show search',
            name: 'Show search',
            table: { category: 'Demo' },
        },
    },
    args: {
        hasSearch: true,
    },
    parameters: {
        docs: {
            story: {
                autoplay: true,
            },
        },
    },
};
export const API = {
    render: (args) => DefaultTemplate(args),
    play: async ({ canvasElement }) => {
        await waitForMarketHydration(canvasElement);
        fixFilterZIndex(canvasElement);
    },
};
export const Small = Object.assign(Object.assign({}, API), { args: {
        size: 'small',
    } });
export const MoreVisibleFilters = Object.assign(Object.assign({}, API), { args: {
        maxVisibleFilters: 9000,
    } });
//# sourceMappingURL=market-filter-group.stories.js.map
