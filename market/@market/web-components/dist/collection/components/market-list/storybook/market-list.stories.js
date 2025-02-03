import { html } from "lit-html";
import { MarketListTemplate } from "./market-list.templates";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
export default {
    title: 'Components/List/API',
    component: 'market-list',
    tags: ['autodocs', '!dev'],
    argTypes: {
        control: {
            control: { type: 'radio' },
            description: 'Control element used within the row',
            name: 'Control type',
            options: ['none', 'checkbox', 'radio', 'toggle'],
            table: { category: 'Demo' },
        },
        disabledItemsIndices: {
            control: { type: 'text' },
            description: 'Comma-separated indices of disabled items, e.g. `"3,6,9"`',
            name: 'Disabled items indices',
            table: { category: 'Demo' },
        },
        hasSearch: {
            control: { type: 'boolean' },
            description: 'Whether or not `<market-input-search slot="search">` is included',
            name: 'Has search input',
            table: { category: 'Demo' },
        },
        hasSelectAll: {
            control: { type: 'boolean' },
            description: `Whether or not a "Select all" option is included.

For this to work well:
- Enable the \`interactive\` and \`multiselect\` attributes
- Set the control type to \`checkbox\` or \`toggle\``,
            name: 'Has "Select all" option',
            table: { category: 'Demo' },
        },
        hasSubtext: {
            control: { type: 'boolean' },
            description: 'Whether or not items have a slotted subtext',
            name: 'Has subtext',
            table: { category: 'Demo' },
        },
        hasValue: {
            control: { type: 'boolean' },
            description: 'Whether or not values are assigned to the items',
            name: 'Has value',
            table: { category: 'Demo' },
        },
        inputSearchValue: {
            control: { type: 'text' },
            description: 'Value provided on the slotted `<market-input-search>`',
            name: 'Input search value',
            table: { category: 'Demo' },
        },
        itemCount: {
            control: { type: 'number' },
            description: 'Number of items displayed on the demo list',
            name: 'Item count',
            table: { category: 'Demo' },
        },
        itemType: {
            control: { type: 'radio' },
            description: 'Component used for the list item',
            name: 'Item type',
            options: ['market-row', 'market-action-card'],
            table: { category: 'Demo' },
        },
        rowArgMap: {
            description: 'Assigns the args to rows; internal only, hidden in storybook',
            table: { disable: true },
        },
        searchEmptyStatePrimaryText: {
            control: { type: 'text' },
            description: 'Text for the empty state, i.e. `empty-state-primary-text` slot',
            name: 'Search empty state primary text',
            table: { category: 'Demo' },
        },
        searchEmptyStateSecondaryText: {
            control: { type: 'text' },
            description: 'Text for the empty state, i.e. `empty-state-secondary-text` slot',
            name: 'Search empty state secondary text',
            table: { category: 'Demo' },
        },
        tooltipItemsIndices: {
            description: 'Comma-separated indices of tooltip items; internal only, hidden in storybook',
            table: { disable: true },
        },
        value: {
            control: { type: 'text' },
        },
    },
    args: {
        control: 'none',
        disabledItemsIndices: '',
        hasSearch: false,
        hasSelectAll: false,
        hasSubtext: false,
        hasValue: true,
        inputSearchValue: '',
        itemCount: 3,
        rowArgMap: {},
        itemType: 'market-row',
        searchEmptyStatePrimaryText: '',
        searchEmptyStateSecondaryText: '',
        tooltipItemsIndices: '',
    },
};
export const API = {
    render: (args) => MarketListTemplate(args),
};
export const BasicUsage = {
    render: (args) => html `
    ${MarketListTemplate(args)}
    <br />
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemType: 'market-action-card' }))}
  `,
};
export const Interactive = {
    render: (args) => MarketListTemplate(Object.assign(Object.assign({}, args), { interactive: true })),
};
export const DefaultValue = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { value: 'mango-1', interactive: true }))}
    <br />
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { value: 'mango-1', itemType: 'market-action-card' }))}
  `,
};
export const DisabledItems = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { disabledItemsIndices: '2', interactive: true }))}
    <br />
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { disabledItemsIndices: '2', itemType: 'market-action-card' }))}
  `,
};
export const Multiselect = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { interactive: true, multiselect: true }))}
    <br />
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemType: 'market-action-card', multiselect: true }))}
  `,
};
export const Controls = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { interactive: true, multiselect: true, control: 'checkbox' }))}
    <br />
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { interactive: true, control: 'radio' }))}
    <br />
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { interactive: true, multiselect: true, control: 'toggle' }))}
  `,
};
export const WithoutValues = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { interactive: true, multiselect: true, hasValue: false }))}
  `,
};
export const DisabledWithTooltip = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { disabledItemsIndices: '2', interactive: true, multiselect: true, tooltipItemsIndices: '2' }))}
  `,
};
export const DrillCards = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemType: 'market-action-card', rowArgMap: {
            0: { variant: 'drill' },
            1: { variant: 'drill' },
            2: { variant: 'drill' },
        }, transient: true }))}
  `,
};
export const ButtonRows = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { interactive: true, transient: true }))}
  `,
};
export const LinkRows = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { rowArgMap: {
            0: { href: '#1' },
            1: { href: '#2' },
            2: { href: '#3' },
        }, interactive: true, transient: true }))}
  `,
};
export const GridLayout = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemCount: 9, itemType: 'market-action-card', multiselect: true, style: 'display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 16px;' }))}
  `,
};
export const ControlRowCheckbox = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { control: 'checkbox', hasSelectAll: true, hasSubtext: true, interactive: true, multiselect: true, value: 'mango-1,pineapple-2' }))}
  `,
};
export const ControlRowToggle = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { control: 'toggle', hasSelectAll: true, hasSubtext: true, interactive: true, multiselect: true, value: 'mango-1,pineapple-2' }))}
  `,
};
export const ControlRowDisabled = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { control: 'checkbox', disabledItemsIndices: '2', hasSelectAll: true, hasSubtext: true, interactive: true, multiselect: true }))}
  `,
};
export const ControlRowDisabledSelected = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { control: 'checkbox', disabledItemsIndices: '2', hasSelectAll: true, hasSubtext: true, interactive: true, multiselect: true, value: 'pineapple-2' }))}
  `,
};
export const SearchTextContent = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { filterStrategy: 'textcontent', hasSearch: true, hasSubtext: true }))}
  `,
};
export const SearchValue = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { filterStrategy: 'value', hasSearch: true, hasSubtext: true }))}
  `,
};
export const EmptyStateText = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { hasSearch: true, inputSearchValue: 'avocado', searchEmptyStatePrimaryText: '「avocado」の検索結果はありません', searchEmptyStateSecondaryText: '別の検索をお試しください' }))}
  `,
};
export const EmptyStateComponent = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { customEmptyState: html `
        <market-empty-state slot="empty-state">
          <svg slot="media" width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 14C6.45 14 6 14.45 6 15C6 15.55 6.45 16 7 16H20V18H7C5.35 18 4 16.65 4 15C4 13.83 4.68 12.82 5.67 12.33L4 4H2V2H8V4H20L18 14H7ZM16.36 12L17.56 6H6.44L7.64 12H16.36ZM7.5 22C8.32843 22 9 21.3284 9 20.5C9 19.6716 8.32843 19 7.5 19C6.67157 19 6 19.6716 6 20.5C6 21.3284 6.67157 22 7.5 22ZM16.5 22C17.3284 22 18 21.3284 18 20.5C18 19.6716 17.3284 19 16.5 19C15.6716 19 15 19.6716 15 20.5C15 21.3284 15.6716 22 16.5 22Z"
            />
          </svg>
          <h3 slot="primary-text">「avocado」の検索結果はありません</h3>
          <p slot="secondary-text">別の検索をお試しください</p>
        </market-empty-state>
      `, hasSearch: true, inputSearchValue: 'avocado' }))}
  `,
};
// --------------------
// Reordering
// --------------------
/* eslint-disable no-console */
const logReorder = (e) => {
    const { detail, target } = e;
    const { item, oldIndex, newIndex } = detail;
    console.log('\n---');
    console.log('marketListItemsReordered!');
    console.log(`row label: ${item.querySelector(':scope > label').textContent.trim()}`);
    console.log(`index: ${oldIndex} -> ${newIndex}`);
    console.log('item node:', item);
    console.log('list node:', target);
};
/* eslint-enable no-console */
const reorderDecorator = (Story, { canvasElement }) => {
    (async () => {
        await waitForMarketHydration(canvasElement);
        const lists = canvasElement.querySelectorAll('market-list');
        lists.forEach((list) => {
            list.addEventListener('marketListItemsReordered', logReorder);
        });
    })();
    return Story();
};
export const InternalReordering = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemCount: 5, reorderable: 'internal', className: 'market-list-reorder-internal' }))}
  `,
    decorators: [reorderDecorator],
};
export const ExternalReordering = {
    render: (args) => html `
    <div class="market-grid-container">
      <market-content-card class="market-grid-item-medium">
        ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemCount: 5, reorderable: 'external', className: 'market-list-reorder-external-1', style: 'height: 100%' }))}
      </market-content-card>
      <market-content-card class="market-grid-item-medium">
        ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemCount: 5, reorderable: 'external', className: 'market-list-reorder-external-2', style: 'height: 100%' }))}
      </market-content-card>
    </div>
  `,
    decorators: [reorderDecorator],
};
export const ReorderModeFramework = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { className: 'market-list-reorder-framework', itemCount: 5, reorderable: 'internal', reorderMode: 'framework' }))}
  `,
    decorators: [reorderDecorator],
};
export const ReorderDragHandles = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { className: 'market-list-reorder-leading-drag-handles', itemCount: 3, reorderable: 'internal', rowArgMap: {
            0: { dragHandlePosition: 'leading' },
            1: { dragHandlePosition: 'leading' },
            2: { dragHandlePosition: 'leading' },
        } }))}
  `,
    decorators: [reorderDecorator],
};
export const ReorderScroll = {
    render: (args) => html `
    <market-content-card style="height: 200px; overflow: scroll;">
      ${MarketListTemplate(Object.assign(Object.assign({}, args), { itemCount: 10, reorderable: 'internal', className: 'market-list-reorder-scrolling' }))}
    </market-content-card>
  `,
    decorators: [reorderDecorator],
};
export const ReorderExtraSlots = {
    render: (args) => html `
    ${MarketListTemplate(Object.assign(Object.assign({}, args), { className: 'market-list-reorder-extra-slots', itemCount: 3, reorderable: 'internal', rowArgMap: {
            0: {
                label: 'Super super long row title like this',
                subtext: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
                leadingAccessory: 'image',
                sideLabel: 'Side',
                sideSubtext: 'Subtext',
            },
            1: {
                label: 'Super super long row title like this',
                subtext: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
                leadingAccessory: 'image',
                sideLabel: 'Side',
                sideSubtext: 'Subtext',
            },
            2: {
                label: 'Super super long row title like this',
                subtext: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
                leadingAccessory: 'image',
                sideLabel: 'Side',
                sideSubtext: 'Subtext',
            },
        } }))}
  `,
    decorators: [reorderDecorator],
};
export const ReorderNested = {
    render: () => html `
    <market-content-card>
      <market-list reorderable="internal">
        <market-row>
          <label slot="label">Item 1</label>
          <market-content-card>
            <market-list reorderable="internal">
              <market-row><label slot="label">Item 2</label></market-row>
              <market-row><label slot="label">Item 3</label></market-row>
              <market-row><label slot="label">Item 4</label></market-row>
            </market-list>
          </market-content-card>
        </market-row>
        <market-row>
          <label slot="label">Item 5</label>
          <market-content-card>
            <market-list reorderable="internal">
              <market-row><label slot="label">Item 6</label></market-row>
              <market-row><label slot="label">Item 7</label></market-row>
              <market-row><label slot="label">Item 8</label></market-row>
            </market-list>
          </market-content-card>
        </market-row>
        <market-row>
          <label slot="label">Item 9</label>
          <market-content-card>
            <market-list reorderable="internal">
              <market-row><label slot="label">Item 10</label></market-row>
              <market-row><label slot="label">Item 11</label></market-row>
              <market-row><label slot="label">Item 12</label></market-row>
            </market-list>
          </market-content-card>
        </market-row>
      </market-list>
    </market-content-card>
    <style>
      market-row market-content-card {
        margin-top: var(--core-metrics-spacing-200);
      }
      market-content-card market-list {
        min-height: var(--core-metrics-spacing-600);
      }
    </style>
  `,
    decorators: [reorderDecorator],
};
//# sourceMappingURL=market-list.stories.js.map
