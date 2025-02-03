import { html } from "lit";
import { MarketTableV2ReorderableTemplate, MarketTableV2CatalogTemplate } from "./market-table-v2.templates";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
import { isMarketTableV2Group } from "../market-table-v2-group/types";
export default {
    title: 'Components/Table/v2/Guide/5. Reordering',
    tags: ['!dev'],
};
/* eslint-disable no-console */
const logReorder = (e) => {
    const { detail } = e;
    const target = e.target;
    const { item, oldIndex, newIndex } = detail;
    const table = target.closest('market-table-v2');
    const row = isMarketTableV2Group(item) ? item.querySelector('market-table-v2-row[slot="parent"]') : item;
    const targetLabel = target === table
        ? 'table root'
        : `${target.querySelector('market-table-v2-row[slot="parent"]').textContent.replace(/\s+/g, ' ').trim()} group`;
    console.log('\n---');
    console.log('marketTableV2RowsReordered!');
    console.log(`index: ${oldIndex} -> ${newIndex}`);
    console.log(`item: ${row.textContent.replace(/\s+/g, ' ').trim()}`);
    console.log(`target: ${targetLabel}`);
    console.log('table node:', table);
    console.log('target node:', target);
    console.log('item node:', item);
};
/* eslint-enable no-console */
const reorderDecorator = (Story, { canvasElement }) => {
    (async () => {
        await waitForMarketHydration(canvasElement);
        const tables = canvasElement.querySelectorAll('market-table-v2');
        tables.forEach((table) => {
            table.addEventListener('marketTableV2RowsReordered', logReorder);
        });
    })();
    return Story();
};
export const Reordering = {
    render: (args) => MarketTableV2ReorderableTemplate(args),
    args: { footer: true, header: true, reorderable: 'internal' },
    decorators: [reorderDecorator],
};
export const ExternalReordering = {
    render: (args) => html `
    <div class="market-grid-container">
      <market-content-card class="market-grid-item-medium">
        ${MarketTableV2ReorderableTemplate(args)}
      </market-content-card>
      <market-content-card class="market-grid-item-medium">
        ${MarketTableV2ReorderableTemplate(args)}
      </market-content-card>
    </div>
  `,
    args: { reorderable: 'external', style: 'min-height: 100%;' },
    decorators: [reorderDecorator],
};
export const DragHandlePosition = {
    render: (args) => MarketTableV2ReorderableTemplate(args),
    args: {
        dragHandlePosition: 'leading',
        header: true,
        footer: true,
        reorderable: 'internal',
    },
    decorators: [reorderDecorator],
};
export const DragHandleVisibility = {
    render: (args) => MarketTableV2ReorderableTemplate(args),
    args: {
        dragHandleVisibility: 'hover',
        header: true,
        footer: true,
        reorderable: 'internal',
    },
    decorators: [reorderDecorator],
};
export const NestedReordering = {
    render: (args) => MarketTableV2CatalogTemplate(args),
    args: {
        collapsed: true,
        images: true,
        reorderable: 'internal',
    },
    decorators: [reorderDecorator],
};
export const FrameworkMode = {
    render: (args) => MarketTableV2ReorderableTemplate(args),
    args: {
        header: true,
        footer: true,
        reorderable: 'internal',
        reorderMode: 'framework',
    },
    decorators: [reorderDecorator],
};
//# sourceMappingURL=guide.reordering.stories.js.map
