import { newSpecPage } from "@stencil/core/testing";
import { MarketTableV2Cell } from "../market-table-v2-cell";
describe('market-table-v2-cell', () => {
    let page;
    describe('with defaults', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Cell],
                html: '<market-table-v2-cell>Cell</market-table-v2-cell>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-cell class="market-table-v2-cell" role="cell">
          <mock:shadow-root>
            <div class="content-outer">
              <slot name="control"></slot>
              <div class="content-inner">
                <slot name="leading-accessory"></slot>
                <div class="default-slot">
                  <slot></slot>
                </div>
                <slot name="trailing-accessory"></slot>
              </div>
            </div>
          </mock:shadow-root>
          Cell
        </market-table-v2-cell>
      `);
        });
    });
    describe('with a caret', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Cell],
                html: '<market-table-v2-cell caret="up">Cell</market-table-v2-cell>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-cell class="market-table-v2-cell" caret="up" role="cell">
          <mock:shadow-root>
            <div class="content-outer">
              <button aria-label="Group of rows is expanded: click to collapse" class="caret-button">
                <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M8.70715 11.7071C8.31663 12.0976 7.68346 12.0976 7.29294 11.7071L1.29294 5.70711L2.70715 4.29289L8.00005 9.58579L13.2929 4.29289L14.7072 5.70711L8.70715 11.7071Z" fill-rule="evenodd"></path>
                </svg>
              </button>
              <slot name="control"></slot>
              <div class="content-inner">
                <slot name="leading-accessory"></slot>
                <div class="default-slot">
                  <slot></slot>
                </div>
                <slot name="trailing-accessory"></slot>
              </div>
            </div>
          </mock:shadow-root>
          Cell
        </market-table-v2-cell>
      `);
        });
    });
    describe('with indentation', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Cell],
                html: '<market-table-v2-cell indent="1">Cell</market-table-v2-cell>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-cell class="market-table-v2-cell" indent="1" role="cell" style="--table-cell-indent-level: 1;">
          <mock:shadow-root>
            <div class="content-outer">
              <slot name="control"></slot>
              <div class="content-inner">
                <slot name="leading-accessory"></slot>
                <div class="default-slot">
                  <slot></slot>
                </div>
                <slot name="trailing-accessory"></slot>
              </div>
            </div>
          </mock:shadow-root>
          Cell
        </market-table-v2-cell>
      `);
        });
    });
    describe('when interactive', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Cell],
                html: '<market-table-v2-cell interactive>Cell</market-table-v2-cell>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-cell interactive class="market-table-v2-cell" role="cell" tabindex="0">
          <mock:shadow-root>
            <div class="content-outer">
              <slot name="control"></slot>
              <div class="content-inner">
                <slot name="leading-accessory"></slot>
                <div class="default-slot">
                  <slot></slot>
                </div>
                <slot name="trailing-accessory"></slot>
              </div>
            </div>
          </mock:shadow-root>
          Cell
        </market-table-v2-cell>
      `);
        });
    });
    describe('when interactive but disabled', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Cell],
                html: '<market-table-v2-cell interactive disabled>Cell</market-table-v2-cell>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-cell interactive disabled class="market-table-v2-cell" role="cell">
          <mock:shadow-root>
            <div class="content-outer">
              <slot name="control"></slot>
              <div class="content-inner">
                <slot name="leading-accessory"></slot>
                <div class="default-slot">
                  <slot></slot>
                </div>
                <slot name="trailing-accessory"></slot>
              </div>
            </div>
          </mock:shadow-root>
          Cell
        </market-table-v2-cell>
      `);
        });
    });
    describe('when sortable', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Cell],
                html: '<market-table-v2-cell sortable>Cell</market-table-v2-cell>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-cell sortable class="market-table-v2-cell" role="cell">
          <mock:shadow-root>
            <div class="content-outer">
              <slot name="control"></slot>
              <div class="content-inner">
                <slot name="leading-accessory"></slot>
                <div class="default-slot">
                  <button class="sort-button" aria-describedby="sort-button-label">
                    <slot></slot>
                    <svg height="17" viewBox="0 0 16 17" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M10.8633 14.31L8.19664 11.6434L9.1433 10.7034L10.67 12.23L10.67 3.17002L12.0033 3.17002L12.0033 12.23L13.53 10.7034L14.47 11.6434L11.8033 14.31C11.5433 14.57 11.1233 14.57 10.8633 14.31ZM2.46997 6.30338L1.52997 5.36338L4.19664 2.69671C4.45664 2.43671 4.87664 2.43671 5.13664 2.69671L7.8033 5.36338L6.8633 6.30338L5.33664 4.77671L5.33664 13.8367L4.0033 13.8367L4.0033 4.77671L2.46997 6.30338Z" fill-rule="evenodd"></path>
                    </svg>
                    <span id="sort-button-label" hidden>
                      Not sorted: click to sort ascending
                    </span>
                  </button>
                </div>
                <slot name="trailing-accessory"></slot>
              </div>
            </div>
          </mock:shadow-root>
          Cell
        </market-table-v2-cell>
      `);
        });
    });
});
//# sourceMappingURL=market-table-v2-cell.spec.js.map
