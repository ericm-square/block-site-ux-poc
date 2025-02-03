import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const PaginationTemplate = ({ currentPage, totalPages, hasNextPage, hasPreviousPage, pageSize, pageSizeSlot, navLabelSlot, navFeedbackSlot, pageSizeOptions, disabled, }) => {
    return html `
    <div class="market-grid-container">
      <div class="market-grid-item-full">
        <market-pagination
          current-page=${ifDefined(currentPage)}
          total-pages=${ifDefined(totalPages)}
          ?has-next-page=${hasNextPage}
          ?has-previous-page=${hasPreviousPage}
          page-size=${ifDefined(pageSize)}
          page-size-options=${ifDefined(pageSizeOptions)}
          ?disabled=${disabled}
        >
          <span slot="page-size-label">${pageSizeSlot}</span>
          <span slot="page-size-feedback">${pageSize}</span>
          <span slot="nav-label">${navLabelSlot}</span>
          <span slot="nav-feedback">${navFeedbackSlot}</span>
        </market-pagination>
      </div>
      <div class="market-grid-item-full">
        <market-table>
          <market-table-row slot="header">
            <market-table-column name="column-1">Header content</market-table-column>
            <market-table-column name="column-2">Header content</market-table-column>
            <market-table-column name="column-3">Header content</market-table-column>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
            <market-table-cell>Cell content</market-table-cell>
          </market-table-row>
        </market-table>
      </div>
      <div class="market-grid-item-full">
        <market-pagination
          current-page=${ifDefined(currentPage)}
          total-pages=${ifDefined(totalPages)}
          ?has-next-page=${hasNextPage}
          ?has-previous-page=${hasPreviousPage}
          page-size=${ifDefined(pageSize)}
          page-size-options=${ifDefined(pageSizeOptions)}
          ?disabled=${disabled}
        >
          <span slot="page-size-label">${pageSizeSlot}</span>
          <span slot="page-size-feedback">${pageSize}</span>
          <span slot="nav-label">${navLabelSlot}</span>
          <span slot="nav-feedback">${navFeedbackSlot}</span>
        </market-pagination>
      </div>
    </div>
  `;
};
//# sourceMappingURL=market-pagination.templates.js.map
