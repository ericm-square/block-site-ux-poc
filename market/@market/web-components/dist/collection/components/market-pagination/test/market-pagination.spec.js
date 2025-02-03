import { newSpecPage } from "@stencil/core/testing";
import { MarketPagination } from "../market-pagination";
describe('market-pagination', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketPagination],
            html: '<market-pagination current-page="5" total-pages="10" page-size="10" page-size-options="10,25,50,100"></market-pagination>',
        });
        expect(page.root).toEqualHtml(`
      <market-pagination class="market-pagination" current-page="5" total-pages="10" page-size="10" page-size-options="10,25,50,100">
        <mock:shadow-root>
          <market-pagination-page-size pagesizeoptions="10,25,50,100" value="10">
            <slot name="page-size-label" slot="page-size-label">Results per page</slot>
            <slot name="page-size-feedback" slot="page-size-feedback">10</slot>
          </market-pagination-page-size>
          <market-pagination-nav currentpage="5" pagesize="10" totalpages="10">
            <slot name="nav-label" slot="nav-label">Page</slot>
            <slot name="nav-feedback" slot="nav-feedback">
              5 of 10
            </slot>
          </market-pagination-nav>
        </mock:shadow-root>
      </market-pagination>
    `);
    });
    it('renders without page size options', async () => {
        const page = await newSpecPage({
            components: [MarketPagination],
            html: '<market-pagination current-page="5" total-pages="10"></market-pagination>',
        });
        expect(page.root).toEqualHtml(`
      <market-pagination class="market-pagination" current-page="5" total-pages="10">
        <mock:shadow-root>
          <market-pagination-nav currentpage="5" totalpages="10">
            <slot name="nav-label" slot="nav-label">Page</slot>
            <slot name="nav-feedback" slot="nav-feedback">
              5 of 10
            </slot>
          </market-pagination-nav>
        </mock:shadow-root>
      </market-pagination>
    `);
    });
});
//# sourceMappingURL=market-pagination.spec.js.map
