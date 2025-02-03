import { newSpecPage } from "@stencil/core/testing";
import { MarketTableV2Row } from "../market-table-v2-row";
describe('market-table-v2-row', () => {
    let page;
    describe('with defaults', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Row],
                html: '<market-table-v2-row></market-table-v2-row>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-row class="market-table-v2-row" role="row">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
        </market-table-v2-row>
      `);
        });
    });
    describe('when interactive', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Row],
                html: '<market-table-v2-row interactive></market-table-v2-row>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-row interactive class="market-table-v2-row" role="row" tabindex="0">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
        </market-table-v2-row>
      `);
        });
    });
    describe('when interactive but disabled', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Row],
                html: '<market-table-v2-row interactive disabled></market-table-v2-row>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-row interactive disabled class="market-table-v2-row" role="row">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
        </market-table-v2-row>
      `);
        });
    });
});
//# sourceMappingURL=market-table-v2-row.spec.js.map
