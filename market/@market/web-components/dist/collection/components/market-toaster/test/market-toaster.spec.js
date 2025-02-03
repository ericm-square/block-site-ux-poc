import { newSpecPage } from "@stencil/core/testing";
import { MarketToast } from "../../market-toast/market-toast";
import { MarketToaster } from "../market-toaster";
describe('market-toaster', () => {
    it('shows and hides market-toast', async () => {
        const page = await newSpecPage({
            components: [MarketToaster, MarketToast],
            html: '<market-toaster/>',
        });
        expect(page.root.querySelectorAll('market-toast').length).toEqual(0);
        const toast = page.doc.createElement('market-toast');
        await page.root.show(toast);
        expect(page.root.querySelectorAll('market-toast').length).toEqual(1);
        await page.root.hide(toast);
        expect(page.root.querySelectorAll('market-toast').length).toEqual(0);
    });
    it('removes all active market-toasts', async () => {
        const page = await newSpecPage({
            components: [MarketToaster, MarketToast],
            html: '<market-toaster/>',
        });
        expect(page.root.querySelectorAll('market-toast').length).toEqual(0);
        const toast1 = page.doc.createElement('market-toast');
        const toast2 = page.doc.createElement('market-toast');
        await page.root.show(toast1);
        await page.root.show(toast2);
        expect(page.root.querySelectorAll('market-toast').length).toEqual(2);
        await page.root.removeAll();
        expect(page.root.querySelectorAll('market-toast').length).toEqual(0);
    });
});
//# sourceMappingURL=market-toaster.spec.js.map
