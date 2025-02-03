import { html } from "lit";
import { MarketTableV2CellTemplate } from "../subcomponents/market-table-v2-cell/storybook/market-table-v2-cell.templates";
import { FruitGroupTemplate, VegetableGroupTemplate, MiscGroupTemplate, } from "../subcomponents/market-table-v2-group/storybook/market-table-v2-group.templates";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
export default {
    title: 'Components/Table/v2/Guide/4. Sorting',
    tags: ['!dev'],
};
const sortDecorator = (Story, { canvasElement }) => {
    (async () => {
        await waitForMarketHydration(canvasElement);
        const table = canvasElement.querySelector('market-table-v2');
        const cell = table.querySelectorAll('market-table-v2-cell')[4];
        cell.sortStrategy = ({ rowA, rowB, order, column }) => {
            const stringA = rowA.children[column].textContent.trim();
            const stringB = rowB.children[column].textContent.trim();
            const numA = Number.parseFloat(stringA.replace(/[^\d.]+/g, ''));
            const numB = Number.parseFloat(stringB.replace(/[^\d.]+/g, ''));
            return order === 'ascending' ? numA - numB : numB - numA;
        };
    })();
    return Story();
};
export const Sortable = {
    render: () => html `
    <market-table-v2 id="market-table-v2-sortable">
      <market-table-v2-row header>
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'string',
        content: 'String',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'number',
        content: 'Number',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'datetime',
        sortStrategyFormat: 'M/d/yyyy',
        content: 'Date',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'datetime',
        sortStrategyFormat: 'h:mm aa',
        content: 'Time',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        content: 'Function',
        align: 'right',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Eerie',
    })}
        ${MarketTableV2CellTemplate({ content: '3.14', align: 'right' })}
        ${MarketTableV2CellTemplate({
        content: '12/31/1999',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '11:11 AM',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '$1,012.12',
        align: 'right',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Zebra',
    })}
        ${MarketTableV2CellTemplate({ content: '42', align: 'right' })}
        ${MarketTableV2CellTemplate({
        content: '2/3/2024',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '5:16 PM',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '$448.20',
        align: 'right',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'ascot',
    })}
        ${MarketTableV2CellTemplate({ content: '-0.9', align: 'right' })}
        ${MarketTableV2CellTemplate({
        content: '6/25/1982',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '3:02 PM',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '$2,344,330.20',
        align: 'right',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Wonderful',
    })}
        ${MarketTableV2CellTemplate({ content: '999', align: 'right' })}
        ${MarketTableV2CellTemplate({
        content: '7/4/1776',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '12:32 AM',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '$76.03',
        align: 'right',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Aardvark',
    })}
        ${MarketTableV2CellTemplate({ content: '0', align: 'right' })}
        ${MarketTableV2CellTemplate({
        content: '4/5/2063',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '2:05 PM',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '$9.99',
        align: 'right',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'wonder',
    })}
        ${MarketTableV2CellTemplate({ content: '-1', align: 'right' })}
        ${MarketTableV2CellTemplate({
        content: '3/10/1984',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '9:00 AM',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: '$25.00',
        align: 'right',
    })}
      </market-table-v2-row>
      <market-table-v2-row footer>
        ${MarketTableV2CellTemplate({
        content: 'String',
    })}
        ${MarketTableV2CellTemplate({ content: 'Number', align: 'right' })}
        ${MarketTableV2CellTemplate({
        content: 'Date',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Time',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Function',
        align: 'right',
    })}
      </market-table-v2-row>
    </market-table-v2>
  `,
    decorators: [sortDecorator],
};
export const NestedSort = {
    render: () => html `
    <market-table-v2 id="market-table-v2-sortable-nested" collapsible align="right">
      <market-table-v2-row header>
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'string',
        content: 'Item',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'number',
        content: 'Qty',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'datetime',
        sortStrategyFormat: 'M/d/yyyy',
        content: 'Date',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        sortStrategy: 'datetime',
        sortStrategyFormat: 'h:mm aa',
        content: 'Time',
        align: 'right',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        sortable: true,
        content: 'Price',
        align: 'right',
    })}
      </market-table-v2-row>
      ${FruitGroupTemplate({})} ${VegetableGroupTemplate({})} ${MiscGroupTemplate({})}
    </market-table-v2>
    <style>
      #market-table-v2-sortable-nested market-table-v2-cell:first-child {
        text-align: left;
      }
    </style>
  `,
    decorators: [sortDecorator],
};
//# sourceMappingURL=guide.sorting.stories.js.map
