import { PaginationTemplate } from "./market-pagination.templates";
export default {
    title: 'Components/Pagination (BETA)/API',
    component: 'market-pagination',
    tags: ['autodocs', '!dev'],
    argTypes: {
        pageSizeSlot: {
            control: { type: 'text' },
            name: 'Page size label',
            description: 'Slotted into `page-size-label`',
            table: { category: 'Demo' },
        },
        navLabelSlot: {
            control: { type: 'text' },
            name: 'Nav label',
            description: 'Slotted into `nav-label`',
            table: { category: 'Demo' },
        },
        navFeedbackSlot: {
            control: { type: 'text' },
            name: 'Nav feedback',
            description: 'Slotted into `nav-feedback`',
            table: { category: 'Demo' },
        },
        disabled: {
            control: { type: 'boolean' },
            name: 'Disabled',
            description: 'Disables all interactive elements',
            table: { category: 'Demo' },
        },
    },
    args: {
        currentPage: 5,
        totalPages: 10,
        pageSize: '10',
        pageSizeSlot: 'Results per page',
        navLabelSlot: 'Page',
        navFeedbackSlot: '5 of 10',
        pageSizeOptions: '10,25,50,100',
        hasPreviousPage: undefined,
        hasNextPage: undefined,
        disabled: false,
    },
};
export const API = {
    render: (args) => PaginationTemplate(args),
};
export const FirstPage = Object.assign(Object.assign({}, API), { args: {
        currentPage: 1,
        navFeedbackSlot: '1 of 10',
    } });
export const LastPage = Object.assign(Object.assign({}, API), { args: {
        currentPage: 10,
        navFeedbackSlot: '10 of 10',
    } });
export const Localized = Object.assign(Object.assign({}, API), { args: {
        pageSizeSlot: 'Resultados por página',
        navLabelSlot: 'Página',
        navFeedbackSlot: '5 de 10',
    } });
export const CustomPageSizeOptions = Object.assign(Object.assign({}, API), { args: {
        pageSize: 'All',
        pageSizeOptions: '10,50,100,All',
    } });
export const WithoutPageSizeOptions = Object.assign(Object.assign({}, API), { args: {
        pageSizeOptions: undefined,
    } });
export const LargeDataset = Object.assign(Object.assign({}, API), { args: {
        totalPages: 56,
        navFeedbackSlot: '5 of 56',
    } });
export const WithoutPageInfo = Object.assign(Object.assign({}, API), { args: {
        currentPage: undefined,
        totalPages: undefined,
        navLabelSlot: undefined,
        navFeedbackSlot: undefined,
    } });
export const WithoutPageInfoWithPreviousPageAvailable = Object.assign(Object.assign({}, API), { args: {
        currentPage: undefined,
        totalPages: undefined,
        navLabelSlot: undefined,
        navFeedbackSlot: undefined,
        hasPreviousPage: true,
    } });
export const WithoutPageInfoWithNextPageAvailable = Object.assign(Object.assign({}, API), { args: {
        currentPage: undefined,
        totalPages: undefined,
        navLabelSlot: undefined,
        navFeedbackSlot: undefined,
        hasNextPage: true,
    } });
export const Disabled = Object.assign(Object.assign({}, API), { args: {
        currentPage: 2,
        navFeedbackSlot: '2 of 10',
        disabled: true,
    } });
//# sourceMappingURL=market-pagination.stories.js.map
