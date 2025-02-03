import { MarketAccessory } from './market-accessory.js';
import { MarketAccordionItem } from './market-accordion-item.js';
import { MarketActionCard } from './market-action-card.js';
import { MarketActivityIndicator } from './market-activity-indicator.js';
import { MarketActivityIndicatorBar } from './market-activity-indicator-bar.js';
import { MarketBanner } from './market-banner.js';
import { MarketBlade } from './market-blade.js';
import { MarketButton } from './market-button.js';
import { MarketButtonDropdown } from './market-button-dropdown.js';
import { MarketButtonGroup } from './market-button-group.js';
import { MarketCheckbox } from './market-checkbox.js';
import { MarketChoiceButton } from './market-choice-button.js';
import { MarketCodeDisplay } from './market-code-display.js';
import { MarketCodeInput } from './market-code-input.js';
import { MarketColorPicker } from './market-color-picker.js';
import { MarketColorPickerGradient } from './market-color-picker-gradient.js';
import { MarketColorPickerInput } from './market-color-picker-input.js';
import { MarketColorSwatch } from './market-color-swatch.js';
import { MarketColorSwatchList } from './market-color-swatch-list.js';
import { MarketContentCard } from './market-content-card.js';
import { MarketContext } from './market-context.js';
import { MarketContextManager } from './market-context-manager.js';
import { MarketDatePicker } from './market-date-picker.js';
import { MarketDatePickerDate } from './market-date-picker-date.js';
import { MarketDatePickerInputDate } from './market-date-picker-input-date.js';
import { MarketDatePickerMenu } from './market-date-picker-menu.js';
import { MarketDialog } from './market-dialog.js';
import { MarketDivider } from './market-divider.js';
import { MarketDragHandle } from './market-drag-handle.js';
import { MarketDropdown } from './market-dropdown.js';
import { MarketEmptyState } from './market-empty-state.js';
import { MarketField } from './market-field.js';
import { MarketFileUpload } from './market-file-upload.js';
import { MarketFilter } from './market-filter.js';
import { MarketFilterButton } from './market-filter-button.js';
import { MarketFilterDropdownMenu } from './market-filter-dropdown-menu.js';
import { MarketFilterGroup } from './market-filter-group.js';
import { MarketFooter } from './market-footer.js';
import { MarketHeader } from './market-header.js';
import { MarketIcon } from './market-icon.js';
import { MarketInlineSectionHeader } from './market-inline-section-header.js';
import { MarketInlineStatus } from './market-inline-status.js';
import { MarketInputPassword } from './market-input-password.js';
import { MarketInputSearch } from './market-input-search.js';
import { MarketInputText } from './market-input-text.js';
import { MarketLink } from './market-link.js';
import { MarketList } from './market-list.js';
import { MarketModalFull } from './market-modal-full.js';
import { MarketModalPartial } from './market-modal-partial.js';
import { MarketPagination } from './market-pagination.js';
import { MarketPaginationNav } from './market-pagination-nav.js';
import { MarketPaginationPageSize } from './market-pagination-page-size.js';
import { MarketPill } from './market-pill.js';
import { MarketPopover } from './market-popover.js';
import { MarketProgressTracker } from './market-progress-tracker.js';
import { MarketProgressTrackerStep } from './market-progress-tracker-step.js';
import { MarketQrcode } from './market-qrcode.js';
import { MarketRadio } from './market-radio.js';
import { MarketRow } from './market-row.js';
import { MarketSegment } from './market-segment.js';
import { MarketSegmentedControl } from './market-segmented-control.js';
import { MarketSelect } from './market-select.js';
import { MarketSheet } from './market-sheet.js';
import { MarketStepper } from './market-stepper.js';
import { MarketTab } from './market-tab.js';
import { MarketTabList } from './market-tab-list.js';
import { MarketTabPanel } from './market-tab-panel.js';
import { MarketTable } from './market-table.js';
import { MarketTableArea } from './market-table-area.js';
import { MarketTableCell } from './market-table-cell.js';
import { MarketTableColumn } from './market-table-column.js';
import { MarketTableRow } from './market-table-row.js';
import { MarketTableV2 } from './market-table-v2.js';
import { MarketTableV2Cell } from './market-table-v2-cell.js';
import { MarketTableV2Group } from './market-table-v2-group.js';
import { MarketTableV2Row } from './market-table-v2-row.js';
import { MarketTabs } from './market-tabs.js';
import { MarketTag } from './market-tag.js';
import { MarketTextarea } from './market-textarea.js';
import { MarketTile } from './market-tile.js';
import { MarketToast } from './market-toast.js';
import { MarketToaster } from './market-toaster.js';
import { MarketToggle } from './market-toggle.js';
import { MarketTooltip } from './market-tooltip.js';
export { getAssetPath, setAssetPath, setNonce, setPlatformOptions } from '@stencil/core/internal/client';
export { s as setTransformTagName } from './index2.js';

function isMarketElement (node) {
    var _a;
    const node_ = node;
    return ((_a = node_ === null || node_ === void 0 ? void 0 : node_.tagName) === null || _a === void 0 ? void 0 : _a.includes('MARKET-')) && typeof node_.componentOnReady === 'function';
}

/**
 * Returns a promise which does not resolve until all Market components in the
 * root element have loaded. Use before running your React tests to make sure
 * Market elements are ready to be interacted with.
 * Takes an Element as a param, which should represent a root node which holds all the Market components you need to test.
 * You can grab this by getting the baseElement property from the render results used with @testing-library/react.
 *
 * Adapted from prior art here:
 * https://github.com/ionic-team/stencil/blob/45388e95edb46ef357eb9ae37cd32bbb5bc1ed23/test/karma/test-app/util.ts#L88-L106
 *
 * @param {Element} domNode
 * @returns {Promise<void>}
 */
const marketComponentsLoaded = async (elm) => {
    var _a, _b, _c;
    if (!elm) {
        return;
    }
    if (isMarketElement(elm)) {
        await new Promise((resolve) => {
            var _a;
            (_a = elm.componentOnReady) === null || _a === void 0 ? void 0 : _a.call(elm).then((value) => {
                resolve(value);
            });
            // Sometimes elements get destroyed before they resolve componentOnReady and then tests will timeout.
            setTimeout(() => {
                resolve(null);
            }, 200);
        });
    }
    const children = [...((_a = elm.children) !== null && _a !== void 0 ? _a : [])];
    const shadowRootChildren = [...((_c = (_b = elm.shadowRoot) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : [])];
    const childElements = [...children, ...shadowRootChildren].filter((el) => ![
        // Market doesn't render inside of SVGs
        'svg',
        // Text nodes have an undefined tagName.
        undefined,
    ].includes(el.tagName));
    await Promise.all(childElements.map((el) => marketComponentsLoaded(el)));
};

const defineCustomElements = (opts) => {
    if (typeof customElements !== 'undefined') {
        [
            MarketAccessory,
            MarketAccordionItem,
            MarketActionCard,
            MarketActivityIndicator,
            MarketActivityIndicatorBar,
            MarketBanner,
            MarketBlade,
            MarketButton,
            MarketButtonDropdown,
            MarketButtonGroup,
            MarketCheckbox,
            MarketChoiceButton,
            MarketCodeDisplay,
            MarketCodeInput,
            MarketColorPicker,
            MarketColorPickerGradient,
            MarketColorPickerInput,
            MarketColorSwatch,
            MarketColorSwatchList,
            MarketContentCard,
            MarketContext,
            MarketContextManager,
            MarketDatePicker,
            MarketDatePickerDate,
            MarketDatePickerInputDate,
            MarketDatePickerMenu,
            MarketDialog,
            MarketDivider,
            MarketDragHandle,
            MarketDropdown,
            MarketEmptyState,
            MarketField,
            MarketFileUpload,
            MarketFilter,
            MarketFilterButton,
            MarketFilterDropdownMenu,
            MarketFilterGroup,
            MarketFooter,
            MarketHeader,
            MarketIcon,
            MarketInlineSectionHeader,
            MarketInlineStatus,
            MarketInputPassword,
            MarketInputSearch,
            MarketInputText,
            MarketLink,
            MarketList,
            MarketModalFull,
            MarketModalPartial,
            MarketPagination,
            MarketPaginationNav,
            MarketPaginationPageSize,
            MarketPill,
            MarketPopover,
            MarketProgressTracker,
            MarketProgressTrackerStep,
            MarketQrcode,
            MarketRadio,
            MarketRow,
            MarketSegment,
            MarketSegmentedControl,
            MarketSelect,
            MarketSheet,
            MarketStepper,
            MarketTab,
            MarketTabList,
            MarketTabPanel,
            MarketTable,
            MarketTableArea,
            MarketTableCell,
            MarketTableColumn,
            MarketTableRow,
            MarketTableV2,
            MarketTableV2Cell,
            MarketTableV2Group,
            MarketTableV2Row,
            MarketTabs,
            MarketTag,
            MarketTextarea,
            MarketTile,
            MarketToast,
            MarketToaster,
            MarketToggle,
            MarketTooltip,
        ].forEach(cmp => {
            if (!customElements.get(cmp.is)) {
                customElements.define(cmp.is, cmp, opts);
            }
        });
    }
};

export { defineCustomElements, isMarketElement, marketComponentsLoaded };

//# sourceMappingURL=index.js.map