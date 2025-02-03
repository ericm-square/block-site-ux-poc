import { newSpecPage } from "@stencil/core/testing";
import { MarketDatePickerDate } from "../market-date-picker-date";
import MutationObserver from "mutation-observer";
// Fix for ReferenceError: MutationObserver is not defined
global.MutationObserver = MutationObserver;
describe('market-date-picker-date', () => {
    it('renders correctly', async () => {
        const page = await newSpecPage({
            components: [MarketDatePickerDate],
            html: '<market-date-picker-date></market-date-picker-date>',
        });
        expect(page.root).toEqualHtml(`
      <market-date-picker-date class="market-date-picker-date" selection="none" tabindex="-1">
        <mock:shadow-root>
        </mock:shadow-root>
      </market-date-picker-date>
    `);
    });
    it('renders correctly a disabled date', async () => {
        const page = await newSpecPage({
            components: [MarketDatePickerDate],
            html: '<market-date-picker-date disabled>Dim.</market-date-picker-date>',
        });
        expect(page.root).toEqualHtml(`
      <market-date-picker-date class="market-date-picker-date" selection="none" tabindex="-1" aria-disabled disabled>
        <mock:shadow-root>
        </mock:shadow-root>
        Dim.
      </market-date-picker-date>
    `);
    });
    it('renders correctly a selected day-type date', async () => {
        const page = await newSpecPage({
            components: [MarketDatePickerDate],
            html: '<market-date-picker-date type="day" selected>Lun.</market-date-picker-date>',
        });
        expect(page.root).toEqualHtml(`
      <market-date-picker-date class="market-date-picker-date" selected="" selection="none" tabindex="-1" type="day">
        <mock:shadow-root>
        </mock:shadow-root>
        Lun.
      </market-date-picker-date>
    `);
    });
    it('renders correctly a selected disabled day-type date', async () => {
        const page = await newSpecPage({
            components: [MarketDatePickerDate],
            html: '<market-date-picker-date type="day" selected disabled>Mar.</market-date-picker-date>',
        });
        expect(page.root).toEqualHtml(`
      <market-date-picker-date aria-disabled="" class="market-date-picker-date" disabled="" selected="" selection="none" tabindex="-1" type="day">
        <mock:shadow-root>
        </mock:shadow-root>
        Mar.
      </market-date-picker-date>
    `);
    });
});
//# sourceMappingURL=market-date-picker-date.spec.js.map
