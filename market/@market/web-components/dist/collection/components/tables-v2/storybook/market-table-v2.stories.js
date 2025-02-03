import { MarketTableV2Template } from "./market-table-v2.templates";
export default {
    title: 'Components/Table/v2/API/Table',
    component: 'market-table-v2',
    subcomponents: {
        MarketTableV2Row: 'market-table-v2-row',
        MarketTableV2Group: 'market-table-v2-group',
    },
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: (args) => MarketTableV2Template(args),
};
//# sourceMappingURL=market-table-v2.stories.js.map
