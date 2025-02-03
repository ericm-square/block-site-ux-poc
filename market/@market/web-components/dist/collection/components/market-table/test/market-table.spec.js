import { newSpecPage } from "@stencil/core/testing";
import MutationObserver from "mutation-observer";
import { MarketTable } from "../market-table";
// Fix for ReferenceError: MutationObserver is not defined
global.MutationObserver = MutationObserver;
// Fix for ReferenceError: ResizeObserver is not defined
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
describe('market-table', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketTable],
            html: '<market-table>Table content</market-table>',
        });
        expect(page.root).toEqualHtml(`
      <market-table class="market-table" role="table">
        <mock:shadow-root>
          <market-table-area orientation="horizontal" stick-to="top">
            <slot name="sticky-header"></slot>
          </market-table-area>
          <market-table-area active="" orientation="horizontal">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
          </market-table-area>
          <market-table-area orientation="horizontal" stick-to="bottom">
            <slot name="sticky-footer"></slot>
          </market-table-area>
        </mock:shadow-root>
        Table content
      </market-table>
    `);
    });
});
//# sourceMappingURL=market-table.spec.js.map
