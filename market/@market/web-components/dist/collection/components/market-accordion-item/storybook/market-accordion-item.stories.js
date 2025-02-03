import { html } from "lit";
import { MarketAccordionItemTemplate } from "./market-accordion-item.templates";
export default {
    title: 'Components/Accordion/API',
    component: 'market-accordion-item',
    tags: ['autodocs', '!dev'],
    argTypes: {
        label: {
            name: 'Label',
            description: 'The label of the accordion item',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
    },
    args: {
        label: 'Accordion Label',
        name: 'demo-accordion',
    },
};
export const API = {
    render: (args) => MarketAccordionItemTemplate(args),
};
export const Large = {
    render: (args) => MarketAccordionItemTemplate(args),
    args: { size: 'large' },
};
export const Medium = {
    render: (args) => MarketAccordionItemTemplate(args),
    args: { size: 'medium' },
};
export const Small = {
    render: (args) => MarketAccordionItemTemplate(args),
    args: { size: 'small' },
};
export const Table = {
    render: () => html `
    <market-table>
      <market-accordion-item name="accordion-table-example">
        <market-table-row slot="custom-trigger">
          <market-table-cell>Apples</market-table-cell>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Fuji</market-table-cell>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Gala</market-table-cell>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Red Delicious</market-table-cell>
        </market-table-row>
      </market-accordion-item>
      <market-accordion-item name="accordion-item-on-table-expanded" expanded>
        <market-table-row slot="custom-trigger">
          <market-table-cell>Oranges</market-table-cell>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Blood orange</market-table-cell>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Mandarin orange</market-table-cell>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Navel orange</market-table-cell>
        </market-table-row>
      </market-accordion-item>
    </market-table>
  `,
};
//# sourceMappingURL=market-accordion-item.stories.js.map
