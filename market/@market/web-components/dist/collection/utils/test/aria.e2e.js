import { newE2EPage } from "@stencil/core/testing";
describe('aria', () => {
    it('should pass aria attributes down to the inner button element', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-button aria-label="test" aria-invalid="true"></market-button>');
        let el = await page.find('market-button');
        let button = await el.find('pierce/button');
        expect(el).toEqualAttribute('aria-label', 'test');
        expect(el).toEqualAttribute('aria-invalid', 'true');
        expect(button).toEqualAttribute('aria-label', 'test');
        expect(button).toEqualAttribute('aria-invalid', 'true');
        el = await page.find('market-button');
        el.setAttribute('aria-label', 'update');
        el.removeAttribute('aria-invalid');
        await page.waitForChanges();
        button = await el.find('pierce/button');
        expect(button).toEqualAttribute('aria-label', 'update');
        expect(button).not.toHaveAttribute('aria-invalid');
    });
});
//# sourceMappingURL=aria.e2e.js.map
