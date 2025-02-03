import { FilterButtonTemplate } from "./market-filter-button.templates";
export default {
    title: 'Components/Filter (BETA)/Button/API',
    tags: ['autodocs', '!dev'],
    component: 'market-filter-button',
    args: {
        labelText: 'Label',
    },
};
export const API = {
    render: (args) => FilterButtonTemplate(args),
};
export const WithFeedback = Object.assign(Object.assign({}, API), { args: {
        feedbackText: 'Feedback',
    } });
export const IconOnly = Object.assign(Object.assign({}, API), { args: {
        feedbackText: '2',
        iconOnly: true,
    } });
//# sourceMappingURL=market-filter-button.stories.js.map
