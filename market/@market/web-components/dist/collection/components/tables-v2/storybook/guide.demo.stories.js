import { MarketTableV2CatalogTemplate, MarketTableV2BulkEditTemplate } from "./market-table-v2.templates";
export default {
    title: 'Components/Table/v2/Guide/6. Demos',
    tags: ['!dev'],
};
export const ItemCatalog = {
    render: (args) => MarketTableV2CatalogTemplate(args),
    args: { actions: true, control: 'checkbox', collapsed: true },
};
export const BulkEdit = {
    render: () => MarketTableV2BulkEditTemplate(),
};
//# sourceMappingURL=guide.demo.stories.js.map
