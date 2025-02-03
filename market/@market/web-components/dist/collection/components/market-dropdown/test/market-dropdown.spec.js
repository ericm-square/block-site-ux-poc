import { newSpecPage } from "@stencil/core/testing";
import { MarketDropdown } from "../market-dropdown";
import MutationObserver from "mutation-observer";
// Fix for ReferenceError: MutationObserver is not defined
global.MutationObserver = MutationObserver;
describe('market-dropdown', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketDropdown],
            html: `
        <market-dropdown>
          <div slot="trigger">trigger</div>
          <div slot="popover">popover</div>
        </market-dropdown>
      `,
        });
        expect(page.root).toEqualHtml(`
      <market-dropdown class="market-dropdown">
        <mock:shadow-root>
          <slot name="trigger"></slot>
          <slot name="popover"></slot>
        </mock:shadow-root>
        <div slot="trigger">trigger</div>
        <div slot="popover" style="position: absolute; left: 0; top: 0; margin: 0;">popover</div>
      </market-dropdown>
    `);
    });
    it('destroys popper instance when disconnected', async () => {
        const page = await newSpecPage({
            components: [MarketDropdown],
            html: `
        <market-dropdown>
          <div slot="trigger">trigger</div>
          <div slot="popover">popover</div>
        </market-dropdown>
      `,
        });
        const dropdown = page.rootInstance;
        expect(dropdown.popperInstance).not.toBeNull();
        dropdown.el.remove();
        await page.waitForChanges();
        expect(dropdown.popperInstance).toBeNull();
    });
});
//# sourceMappingURL=market-dropdown.spec.js.map
