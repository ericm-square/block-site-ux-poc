import { newE2EPage } from "@stencil/core/testing";
describe('market-tab-panel', () => {
    let page;
    let el;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent('<market-tab-panel>Text content</market-tab-panel>');
        el = await page.find('market-tab-panel');
        expect(el).toHaveAttribute('hydrated');
        expect(el).toHaveClass('market-tab-panel');
        expect(el).toEqualAttribute('role', 'tabpanel');
        expect(el).toEqualAttribute('tabindex', '0');
        expect(el).not.toHaveAttribute('hidden');
        expect(el).toEqualAttribute('aria-hidden', 'false');
        expect(await el.isVisible()).toStrictEqual(true);
        expect(el.textContent).toStrictEqual('Text content');
    });
    it('is hidden when `hidden` property is set to `true`', async () => {
        el.setProperty('hidden', true);
        await page.waitForChanges();
        expect(await el.isVisible()).toStrictEqual(false);
    });
});
//# sourceMappingURL=market-tab-panel.e2e.js.map
