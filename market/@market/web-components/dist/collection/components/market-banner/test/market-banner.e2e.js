import { newE2EPage } from "@stencil/core/testing";
describe('market-banner', () => {
    it('renders with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-banner>Good news, everyone!</market-banner>');
        const el = await page.find('market-banner');
        expect(el).not.toBeNull();
        expect(await el.getProperty('variant')).toBe('info');
        expect(el.textContent).toBe('Good news, everyone!');
    });
    it('renders with a title', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-banner>
        <span slot="title">Title</span>
        Good news, everyone!
      </market-banner>
    `);
        const el = await page.find('market-banner');
        const headerEl = await el.find('pierce/header');
        const defaultSlotText = await page.$eval('market-banner', (bannerEl) => {
            const defaultSlot = bannerEl.shadowRoot.querySelector('section > slot');
            return defaultSlot
                .assignedNodes()
                .reduce((result, node) => result + node.textContent, '')
                .trim();
        });
        expect(defaultSlotText).toStrictEqual('Good news, everyone!');
        const titleSlotText = await page.$eval('market-banner', (bannerEl) => {
            const titleSlot = bannerEl.shadowRoot.querySelector('slot[name="title"]');
            return titleSlot.assignedNodes()[0].textContent.trim();
        });
        expect(titleSlotText).toStrictEqual('Title');
        expect(await headerEl.isVisible()).toStrictEqual(true);
    });
    describe('dismissable banners', () => {
        let page;
        let banner;
        let button;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-banner dismissable>Good news, everyone!</market-banner>');
            banner = await page.find('market-banner');
            button = await banner.find('pierce/.dismiss-container button');
        });
        describe('when the dismissable X is clicked', () => {
            let eventSpy;
            beforeEach(async () => {
                eventSpy = await banner.spyOnEvent('marketBannerDismissed');
                await button.click();
                await page.waitForChanges();
            });
            it('removes itself from the page', async () => {
                const bannerAfter = await page.find('market-banner');
                expect(bannerAfter).toBeNull();
            });
            it('emits a dismiss event', () => {
                expect(eventSpy).toHaveReceivedEventTimes(1);
            });
        });
        describe('when preventDefault() is called on the dismiss event', () => {
            beforeEach(async () => {
                await page.$eval('market-banner', (el) => {
                    el.addEventListener('marketBannerDismissed', (e) => e.preventDefault());
                });
                await page.waitForChanges();
            });
            it('does NOT remove itself from the page when the dismissable X is clicked', async () => {
                await button.click();
                await page.waitForChanges();
                const bannerAfter = await page.find('market-banner');
                expect(bannerAfter).not.toBeNull();
            });
        });
    });
});
//# sourceMappingURL=market-banner.e2e.js.map
