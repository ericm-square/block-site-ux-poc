import { newE2EPage } from "@stencil/core/testing";
describe('market-icon', () => {
    it('displays an icon when passed a semantic token name', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-icon name="inform" fidelity="24"></market-icon>');
        const element = await page.find('market-icon');
        const svg = await element.find('svg');
        const symbol = await page.find('#market-icon-i-circle-fidelity-24');
        expect(element).not.toBeNull();
        expect(element).toHaveClass('market-icon');
        expect(element).toEqualAttribute('fidelity', '24');
        expect(element).toEqualAttribute('name', 'inform');
        expect(element).toHaveAttribute('tintable');
        expect(svg).not.toBeNull();
        expect(svg).toEqualAttribute('viewBox', '0 0 24 24');
        expect(svg.innerHTML).toEqual(symbol.innerHTML);
    });
    it('can be passed a descriptive asset name', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-icon name="i-circle"></market-icon>');
        const element = await page.find('market-icon');
        const svg = await element.find('svg');
        const symbol = await page.find('#market-icon-i-circle-fidelity-24');
        expect(element).not.toBeNull();
        expect(element).toHaveClass('market-icon');
        expect(element).toEqualAttribute('name', 'i-circle');
        // non-token icons are tintabe by default
        expect(element).toHaveAttribute('tintable');
        expect(svg.innerHTML).toEqual(symbol.innerHTML);
    });
    it('chooses the default fidelity when an invalid fidelity or none is passed', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-icon name="inform"></market-icon>');
        const element = await page.find('market-icon');
        const svg = await element.find('svg');
        // No fidelity passed
        expect(element).not.toHaveAttribute('fidelity');
        expect(svg).toEqualAttribute('viewBox', '0 0 24 24');
        // Setting an invalid fidelity for this icon (fidelity:55 does not exist in the tokens for the "inform" icon)
        await element.setAttribute('fidelity', '55');
        await page.waitForChanges();
        expect(element).toEqualAttribute('fidelity', '55');
        expect(svg).toEqualAttribute('viewBox', '0 0 24 24');
    });
    // Currently there are no tokens with multiple fidelities, so can't really test this
    it.skip('sets the fidelity to one other than the default if one is passed', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-icon name="some-future-icon-with-multiple-fidelities" fidelity="16"></market-icon>');
        const element = await page.find('market-icon');
        const svg = await element.find('svg');
        expect(element).toEqualAttribute('fidelity', '16');
        expect(svg).toEqualAttribute('viewBox', '0 0 16 16');
    });
    it('changes color if it is tintable', async () => {
        const page = await newE2EPage();
        // Have to use RGB here because getComputedStyle() returns RGB
        await page.setContent(`
      <market-icon name="inform" style="color: rgb(182, 3, 252)"></market-icon>
    `);
        const element = await page.find('market-icon');
        const svg = await element.find('svg');
        expect(element).toHaveAttribute('tintable');
        const style = await svg.getComputedStyle();
        expect(style.color).toBe('rgb(182, 3, 252)');
    });
});
//# sourceMappingURL=market-icon.e2e.js.map
